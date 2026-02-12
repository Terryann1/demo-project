'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useMovies } from '../../../context/MovieContext';

export default function AddMoviePage() {
  const router = useRouter();
  const { addMovie } = useMovies();
  
  const [formData, setFormData] = useState({
    title: '',
    director: '',
    year: new Date().getFullYear(),
    genre: '',
    rating: 5,
    poster: '',
    description: '',
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    addMovie(formData);
    //router.push('/');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'year' || name === 'rating' ? Number(value) : value
    }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold ">Add New Movie</h1>
      
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
        <div className="mb-6">
          <label htmlFor="title" className="block text-black font-semibold mb-2">
            Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
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
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="year" className="block text-black font-semibold mb-2">
              Year *
            </label>
            <input
              type="number"
              id="year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              required
              min="1900"
              max={new Date().getFullYear() }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>

          <div>
            <label htmlFor="genre" className="block text-black font-semibold mb-2">
              Genre *
            </label>
            <select
              id="genre"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            >
              <option value="">Select Genre</option>
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
          <label htmlFor="rating" className="block text-black font-semibold mb-2">
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
          <label htmlFor="poster" className="block text-black font-semibold mb-2">
            Poster URL *
          </label>
          <input
            type="url"
            id="poster"
            name="poster"
            value={formData.poster}
            onChange={handleChange}
            required
            placeholder="https://example.com/poster.jpg"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder-gray-400"
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
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Add Movie
          </button>
          <button
            type="button"
            onClick={() => router.push('/')}
            className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
