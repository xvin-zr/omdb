import { useEffect, useState, useTransition } from 'react';

export function useSuspenseFetch<T>(fetcher: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(
    function () {
      let cancelled = false;

      fetcher()
        .then((res) => {
          if (!cancelled) {
            startTransition(() => setData(res));
          }
        })
        .catch((err) => {
          if (!cancelled) {
            startTransition(() => setData(null));
          }
          if (err instanceof Error) {
            throw err;
          }
          throw new Error('An unknown error occurred while fetching from API');
        });

      return () => {
        cancelled = true;
      };
    },
    [fetcher]
  );

  return [data, isPending] as const;
}
