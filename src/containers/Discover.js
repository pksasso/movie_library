import React, { useEffect, useContext } from 'react';
import { animateScroll } from 'react-scroll';

import MovieList from '../components/MovieList';
import { getMovie } from '../connections/connections';

import { MovieContext } from '../contexts/MovieContext';

function Discover() {

  const {
    selected,
    movieList,
    setMovieList } = useContext(MovieContext);

  useEffect(() => {
    animateScroll.scrollToTop({ smooth: true });
    getMovie(setMovieList, selected);
  }, [selected, setMovieList]);

  return (
    <>
      <MovieList header={selected} movieList={movieList} />
    </>
  );
}

export default Discover;
