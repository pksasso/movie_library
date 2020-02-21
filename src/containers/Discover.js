import React, { useState, useEffect } from 'react';

import MovieList from '../components/MovieList';
import { getMovie } from '../connections/connections';


function Discover({ selected, setSelected }) {

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    function handleRoute() {
      switch (selected) {
        case 'popular':
          getMovie(setMovies, selected);
          break;
        case 'top_rated':
          getMovie(setMovies, selected);
          break;
        case 'upcoming':
          getMovie(setMovies, selected);
          break;
        default:
          break;
      }
    }
    handleRoute();
  }, [selected, setMovies]);

  return (
    <>
      <MovieList
        list={movies}
        selected={selected}
        setSelected={setSelected}
      />
    </>
  );
}

export default Discover;
