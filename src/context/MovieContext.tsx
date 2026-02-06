'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Movie } from '../types/movie';
import moviesData from '../data/movies.json';

interface MovieContextType {
  movies: Movie[];
  addMovie: (movie: Omit<Movie, 'id'>) => void;
  updateMovie: (id: string, movie: Omit<Movie, 'id'>) => void;
  deleteMovie: (id: string) => void;
  getMovieById: (id: string) => Movie | undefined;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export function MovieProvider({ children }: { children: ReactNode }) {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    // Load initial data from JSON
    setMovies(moviesData as Movie[]);
  }, []);

  const addMovie = (movie: Omit<Movie, 'id'>) => {
    const newMovie: Movie = {
      ...movie,
      id: Date.now().toString(),
    };
    setMovies([...movies, newMovie]);
  };

  const updateMovie = (id: string, updatedMovie: Omit<Movie, 'id'>) => {
    setMovies(movies.map(movie => 
      movie.id === id ? { ...updatedMovie, id } : movie
    ));
  };

  const deleteMovie = (id: string) => {
    setMovies(movies.filter(movie => movie.id !== id));
  };

  const getMovieById = (id: string) => {
    return movies.find(movie => movie.id === id);
  };

  return (
    <MovieContext.Provider value={{ movies, addMovie, updateMovie, deleteMovie, getMovieById }}>
      {children}
    </MovieContext.Provider>
  );
}

export function useMovies() {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error('useMovies must be used within MovieProvider');
  }
  return context;
}
