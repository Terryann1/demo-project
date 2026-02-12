'use client';

import { useState, useMemo } from 'react';
import { useMovies } from '@/context/MovieContext';
import MovieCard from '@/components/MovieCard';
import SearchBar from '@/components/SearchBar';  // ← Check this import

export default function Home() {
  const { movies } = useMovies();
  
  // State for search and filter
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  // Filter movies
  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => {
      const matchesSearch = 
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.director.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesGenre = selectedGenre === '' || movie.genre === selectedGenre;
      
      return matchesSearch && matchesGenre;
    });
  }, [movies, searchTerm, selectedGenre]);

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">All Movies</h1>
        <p className="text-gray-600">
          Browse and manage your movie collection ({filteredMovies.length} movies)
        </p>
      </div>

      {/* SearchBar Component - MUST BE HERE */}
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedGenre={selectedGenre}
        onGenreChange={setSelectedGenre}
      />

      {/* Movies Grid */}
      {filteredMovies.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No movies found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
