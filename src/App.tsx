import { Suspense } from 'react';
import './App.css';
import Loading from './components/loading';
import Search from './components/search';
import SearchResults from './components/search-results';
import Movie from './components/movie';

function App() {
  return (
    <>
      <main className="flex flex-col bg-zinc-50 min-h-screen p-4">
        <Search />
        <section className="grid gap-4 md:grid-cols-2">
          <Suspense fallback={<Loading />}>
            <SearchResults />
            <Movie />
          </Suspense>
        </section>
      </main>
    </>
  );
}

export default App;
