import { useCallback } from 'react';
import { useSearchParams } from '../hooks/use-location';

function Search() {
  const [search, setSearch] = useSearchParams('search');

  const handleSubmit = useCallback(
    function (e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const searchValue = formData.get('search')!.toString();
      setSearch(searchValue);
    },
    [setSearch]
  );

  return (
    <form className="flex gap-4 items-center mb-2" onSubmit={handleSubmit}>
      <label htmlFor="search">Search for a movie</label>
      <input
        type="text"
        name="search"
        id="search"
        className="w-full px-2 h-8 shadow border placeholder:text-zinc-400"
        defaultValue={search}
        placeholder="Movie Title"
        required
      />
      <button type="submit" className="">
        Search
      </button>
    </form>
  );
}

export default Search;
