import { Suspense } from 'react';
import './App.css';
import Loading from './components/loading';
import Search from './components/search';

function App() {
  return (
    <>
      <main className="flex flex-col bg-zinc-50 min-h-screen p-4">
        <Search />
        <section className="grid gap-4">
          <Suspense fallback={<Loading />}></Suspense>
        </section>
      </main>
    </>
  );
}

export default App;
