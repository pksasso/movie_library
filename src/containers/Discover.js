import React, { useEffect, useContext } from 'react';

import MovieList from '../components/MovieList';
import { getMovie } from '../connections/connections';

import { MovieContext } from '../contexts/MovieContext';

function Discover() {

  const {
    selected,
    movieList,
    setMovieList } = useContext(MovieContext);

  useEffect(() => {
    getMovie(setMovieList, selected);
  }, [selected, setMovieList]);

  return (
    <>
      <MovieList header={selected} movieList={movieList} />
    </>
  );
}

export default Discover;
