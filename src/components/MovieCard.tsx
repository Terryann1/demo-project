import Link from 'next/link';
import { Movie } from '../types/movie';
import Image from 'next/image';

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link href={`/movies/${movie.id}`}>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 cursor-pointer h-full">
        <div className="relative h-64 w-full">
          <Image
            src={movie.poster}
            alt={movie.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-4">
          <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
            {movie.title}
          </h3>
          <p className="text-gray-600 mb-2">
            <span className="font-semibold">Director:</span> {movie.director}
          </p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">{movie.year}</span>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
              {movie.genre}
            </span>
          </div>
          <div className="mt-2 flex items-center">
            <span className="text-yellow-500 mr-1">⭐</span>
            <span className="font-bold">{movie.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
