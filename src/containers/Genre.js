import React, { useEffect, useContext } from 'react';
import { animateScroll } from 'react-scroll';

import MovieList from '../components/MovieList';
import { getMovieByGenre, clearMovie } from '../connections/connections';

import { MovieContext } from '../contexts/MovieContext';

function Genre({ match }) {

  const {
    genreList,
    genreId,
    setMenuSelected,
    movieList,
    setMovieList } = useContext(MovieContext);

  const query = match.params.name.replace(/\s+/g, ' ').toLowerCase();

  useEffect(() => {
    animateScroll.scrollToTop({ smooth: true });
    getMovieByGenre(setMovieList,
      genreList.find(item => item.name.toLowerCase() === query).id
    );
    setMenuSelected(query);
    return () => {
      clearMovie(setMovieList);
    }
  }, [query,
    genreId,
    match.params.name,
    setMenuSelected,
    setMovieList,
    genreList]);

  return (
    <>
      <MovieList header={query} movieList={movieList} />
    </>
  );
}

export default Genre;
