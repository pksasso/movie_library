import React, { useEffect, useContext } from 'react';

import MovieList from '../components/MovieList';
import { getMovieByGenre } from '../connections/connections';

import { MovieContext } from '../contexts/MovieContext';

function Genre() {

  const {
    selected,
    genreId,
    movieList,
    setMovieList } = useContext(MovieContext);

  useEffect(() => {
    getMovieByGenre(setMovieList, genreId.toString());
  }, [movieList, genreId, setMovieList]);

  return (
    <>
      <MovieList header={selected} movieList={movieList} />
    </>
  );
}

export default Genre;
