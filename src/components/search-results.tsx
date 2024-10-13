import { useSearch } from '../hooks/use-api';
import Link from './link';
import Loading from './loading';

function SearchResults() {
  const [results, isPending] = useSearch();

  if (isPending) {
    return <Loading />;
  }

  if (results === null) {
    return <p>Search for a movie using the field above to get started.</p>;
  }

  if (results.Search.length === 0) {
    return <p>No results found.</p>;
  }

  return (
    <div className="px-4 flex flex-col auto-rows-auto gap-2">
      <Link
        to={`/?search=`}
        className="w-fit h-fit hover:decoration-from-font hover:decoration-current hover:underline"
      >
        Clear Search
      </Link>
      {results.Search.map((movie) => (
        <SearchResult key={movie.imdbID} movie={movie} />
      ))}
    </div>
  );
}

type SearchResultProps = {
  movie: SearchResult;
};
function SearchResult({ movie }: SearchResultProps) {
  return (
    <Link
      className="flex justify-between border py-1 px-2 hover:shadow-sm hover:bg-zinc-200 bg-zinc-100"
      to={`${movie.imdbID}`}
      tabIndex={0}
    >
      <h2 className="font-bold">{movie.Title}</h2>
      <p className="text-zinc-500">{movie.Year}</p>
    </Link>
  );
}
export default SearchResults;
