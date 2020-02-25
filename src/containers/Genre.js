import React, { useEffect, useContext } from 'react';
import { animateScroll } from 'react-scroll';

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
    animateScroll.scrollToTop({ smooth: true });
    getMovieByGenre(setMovieList, genreId.toString());
  }, [selected, genreId]);

  return (
    <>
      <MovieList header={selected} movieList={movieList} />
    </>
  );
}

export default Genre;
