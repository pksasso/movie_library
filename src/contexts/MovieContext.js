import React, { useState, createContext } from 'react';

export const MovieContext = createContext(null);

export const MovieProvider = ({ children }) => {
  const [menuSelected, setMenuSelected] = useState('popular');
  const [movieList, setMovieList] = useState([]);
  const [genreId, setGenreId] = useState({});
  const [genreList, setGenreList] = useState([]);
  const [movieSelected, setMovieSelected] = useState();
  const [totalPages, setTotalPages] = useState(0);
  const [dropdownSelected, setDropdownSelected] = useState({ id: 1, title: "popularity", type: "desc" });

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
      setGenreList,
      totalPages,
      setTotalPages,
      dropdownSelected,
      setDropdownSelected
    }}>
      {children}
    </MovieContext.Provider>);
}
