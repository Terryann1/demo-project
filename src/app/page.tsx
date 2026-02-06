
'use client';

import { useMovies } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';

export default function Home() {
  const { movies } = useMovies();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">All Movies</h1>
        <p className="text-gray-600">Browse and manage your movie collection</p>
      </div>

      {movies.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No movies found. Add your first movie!</p>
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

