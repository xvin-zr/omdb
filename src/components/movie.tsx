import { useMovie } from '../hooks/use-api';
import Image from './image';
import Link from './link';
import Loading from './loading';

export default function Movie() {
  const [movie, isPending] = useMovie();

  if (!movie) return null;

  if (isPending) {
    return <Loading />;
  }

  return (
    <section className="flex gap-2 flex-col">
      <Link
        to="/"
        className="w-fit h-fit hover:decoration-from-font hover:decoration-current hover:underline"
      >
        Clear Movie
      </Link>
      <article>
        <Image src={movie.Poster} alt={movie.Title} className="" />
      </article>
      <div className="space-y-1">
        <header className="flex gap-3">
          <h2 className="font-bold">{movie.Title}</h2>
          <p className="">{movie.Year}</p>
        </header>
        <ul>
          <li>{movie.Rated}</li>
          <li>{movie.Runtime}</li>
          <li>{movie.Language}</li>
        </ul>
        <p>{movie.Plot}</p>
        <ul>
          <li className="flex gap-4">
            <span className="font-medium">Meta Score</span>
            {movie.Metascore}
          </li>
          <li className="flex gap-4">
            <span className="font-medium">IMDB Rating</span>
            {movie.imdbRating}
          </li>
        </ul>
        <ul>
          <li className="flex gap-4">
            <span className="font-medium">Director</span>
            {movie.Director}
          </li>
          <li className="flex gap-4">
            <span className="font-medium">Writers</span>
            {movie.Writer}
          </li>
          <li className="flex gap-4">
            <span className="font-medium">Actors</span>
            {movie.Actors} cln
          </li>
          <li className="flex gap-4">
            <span className="font-medium">Genre</span>
            {movie.Genre}
          </li>
        </ul>
      </div>
    </section>
  );
}
