import React, { useEffect, useContext } from 'react';
import { animateScroll } from 'react-scroll';

import MovieList from '../components/MovieList';
import { getMovie } from '../connections/connections';

import { MovieContext } from '../contexts/MovieContext';

function Discover({ match }) {

  const {
    movieList,
    setMovieList,
    setMenuSelected } = useContext(MovieContext);
  const query = match.params.name.replace(/\s+/g, '_').toLowerCase();

  useEffect(() => {
    animateScroll.scrollToTop({ smooth: true });
    getMovie(setMovieList, query);
    setMenuSelected(query);
  }, [match.params.name, query, setMenuSelected, setMovieList]);

  return (
    <>
      <MovieList header={query} movieList={movieList} />
    </>
  );
}

export default Discover;
