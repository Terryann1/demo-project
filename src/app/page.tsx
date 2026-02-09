
'use client';

import { useMovies } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';

export default function Home() {
  const { movies } = useMovies();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold white">All Movies</h1>
        <p className="white">Browse and manage your movie collection</p>
      </div>

      {movies.length === 0 ? (
        <div className="text-center py-12">
          <p className="white">No movies found. Add your first movie!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

