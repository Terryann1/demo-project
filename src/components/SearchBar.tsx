'use client';

import { ChangeEvent } from 'react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedGenre: string;
  onGenreChange: (value: string) => void;
}

export default function SearchBar({ 
  searchTerm, 
  onSearchChange, 
  selectedGenre, 
  onGenreChange 
}: SearchBarProps) {
  return (
    <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Search Input */}
        <div>
          <label htmlFor="search" className="block text-sm font-semibold text-gray-700 mb-2">
            Search Movies
          </label>
          <input
            type="text"
            id="search"
            placeholder="Search by title, director..."
            value={searchTerm}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
        </div>

        {/* Genre Filter */}
        <div>
          <label htmlFor="genre" className="block text-sm font-semibold text-gray-700 mb-2">
            Filter by Genre
          </label>
          <select
            id="genre"
            value={selectedGenre}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => onGenreChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          >
            <option value="">All Genres</option>
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

      {/* Active Filters Display */}
      {(searchTerm || selectedGenre) && (
        <div className="mt-4 flex items-center gap-2 flex-wrap">
          <span className="text-sm text-gray-600">Active filters:</span>
          {searchTerm && (
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">
              Search: "{searchTerm}"
              <button
                onClick={() => onSearchChange('')}
                className="hover:text-blue-900"
              >
                ✕
              </button>
            </span>
          )}
          {selectedGenre && (
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">
              Genre: {selectedGenre}
              <button
                onClick={() => onGenreChange('')}
                className="hover:text-purple-900"
              >
                ✕
              </button>
            </span>
          )}
          <button
            onClick={() => {
              onSearchChange('');
              onGenreChange('');
            }}
            className="text-sm text-red-600 hover:text-red-800 font-semibold"
          >
            Clear All
          </button>
        </div>
      )}
    </div>
  );
}

