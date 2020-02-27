import React, { useState, createContext } from 'react';

export const MovieContext = createContext(null);

export const MovieProvider = ({ children }) => {
  const [menuSelected, setMenuSelected] = useState('popular');
  const [movieList, setMovieList] = useState([]);
  const [genreId, setGenreId] = useState({});
  const [genreList, setGenreList] = useState([]);
  const [movieSelected, setMovieSelected] = useState();

  return (
    <MovieContext.Provider value={{
      menuSelected,
      setMenuSelected,
      genreId,
      setGenreId,
      movieList,
      setMovieList,
      movieSelected,
      setMovieSelected,
      genreList,
      setGenreList
    }}>
      {children}
    </MovieContext.Provider>);
}
