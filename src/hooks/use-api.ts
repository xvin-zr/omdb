import axios from 'axios';
import { usePathParams, useSearchParams } from './use-location';
import { useCallback } from 'react';
import { useSuspenseFetch } from './use-suspense-fetch';

const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

if (!API_KEY) {
  throw new Error('API_KEY is not defined');
}

export async function fetchFromAPI<T>(url: string): Promise<T> {
  try {
    const resp = await axios.get(url);
    return resp.data;
  } catch (err) {
    console.error('Error fetching from API:', err);
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error('An unknown error occurred while fetching from API');
  }
}

export async function fetchSearchResults(query?: string) {
  if (!query) return null;

  return fetchFromAPI<{ Search: SearchResult[] }>(`${API_URL}&s=${query}`);
}

export async function fetchMovie(id?: string) {
  if (!id) return null;
  return fetchFromAPI<Movie>(`${API_URL}&i=${id}`);
}

export function useSearch() {
  const [search] = useSearchParams('search');

  const fetcher = useCallback(() => fetchSearchResults(search), [search]);

  const [results, isPending] = useSuspenseFetch(fetcher);

  return [results, isPending] as const;
}

/**
 * Custom hook for fetching a movie based on the ID from the URL path.
 * 
 * @returns A tuple containing the movie object and a boolean indicating if the fetch is pending.
 */
export function useMovie() {
  const id = usePathParams('/:id', 'id');

  const fetcher = useCallback(() => fetchMovie(id), [id]);

  const [movie, isPending] = useSuspenseFetch(fetcher);

  return [movie, isPending] as const;
}
