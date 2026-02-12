'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useMovies } from '@/context/MovieContext';
import Image from 'next/image';
import SearchBar from '@/components/SearchBar';

export default function MovieDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const { getMovieById, updateMovie, deleteMovie } = useMovies();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    director: '',
    year: 0,
    genre: '',
    rating: 0,
    poster: '',
    description: '',
  });

  const movieId = params.id as string;
  const movie = getMovieById(movieId);

  useEffect(() => {
    if (movie) {
      setFormData({
        title: movie.title,
        director: movie.director,
        year: movie.year,
        genre: movie.genre,
        rating: movie.rating,
        poster: movie.poster,
        description: movie.description,
      });
    }
  }, [movie]);

  if (!movie) {
    return (
      <div className="text-center py-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Movie Not Found</h1>
        <button
          onClick={() => router.push('/')}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Back to Home
        </button>
      </div>
    );
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    updateMovie(movieId, formData);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this movie?')) {
      deleteMovie(movieId);
      router.push('/');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'year' || name === 'rating' ? Number(value) : value
    }));
  };

  if (isEditing) {
    return (
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Edit Movie</h1>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">
              Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="director" className="block text-gray-700 font-semibold mb-2">
              Director *
            </label>
            <input
              type="text"
              id="director"
              name="director"
              value={formData.director}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="year" className="block text-gray-700 font-semibold mb-2">
                Year *
              </label>
              <input
                type="number"
                id="year"
                name="year"
                value={formData.year}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="genre" className="block text-gray-700 font-semibold mb-2">
                Genre *
              </label>
              <select
                id="genre"
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Action">Action</option>
                <option value="Comedy">Comedy</option>
                <option value="Drama">Drama</option>
                <option value="Horror">Horror</option>
                <option value="Sci-Fi">Sci-Fi</option>
                <option value="Romance">Romance</option>
                <option value="Thriller">Thriller</option>
                <option value="Animation">Animation</option>
                <option value="Crime">Crime</option>
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="rating" className="block text-gray-700 font-semibold mb-2">
              Rating: {formData.rating}/10
            </label>
            <input
              type="range"
              id="rating"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              min="0"
              max="10"
              step="0.1"
              className="w-full"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="poster" className="block text-gray-700 font-semibold mb-2">
              Poster URL *
            </label>
            <input
              type="url"
              id="poster"
              name="poster"
              value={formData.poster}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => router.push('/')}
        className="mb-6 text-blue-600 hover:text-blue-800 font-semibold"
      >
        ← Back to All Movies
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3">
            <div className="relative h-96 md:h-full">
              <Image
                src={movie.poster}
                alt={movie.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
          
          <div className="md:w-2/3 p-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{movie.title}</h1>
            
            <div className="space-y-3 mb-6">
              <p className="text-gray-700">
                <span className="font-semibold">Director:</span> {movie.director}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Year:</span> {movie.year}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Genre:</span> 
                <span className="ml-2 bg-blue-100 text-blue-800 px-3 py-1 rounded">
                  {movie.genre}
                </span>
              </p>
              <p className="text-gray-700 flex items-center">
                <span className="font-semibold mr-2">Rating:</span>
                <span className="text-yellow-500 mr-1">⭐</span>
                <span className="font-bold text-xl">{movie.rating}/10</span>
              </p>
            </div>

            <div className="mb-6">
              <h2 className="font-semibold text-gray-800 mb-2 text-lg">Description</h2>
              <p className="text-gray-600 leading-relaxed">{movie.description}</p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setIsEditing(true)}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Edit Movie
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition"
              >
                Delete Movie
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
