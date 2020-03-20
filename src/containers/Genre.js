import React, { useEffect, useContext } from 'react';
import { animateScroll } from 'react-scroll';

import MovieList from '../components/MovieList';
import { getMovieByGenre, clearMovie, loadGenre } from '../connections/connections';

import { MovieContext } from '../contexts/MovieContext';

function Genre({ match }) {

  const {
    setMenuSelected,
    movieList,
    setMovieList } = useContext(MovieContext);

  const query = match.params.name.replace(/\s+/g, ' ').toLowerCase();

  useEffect(() => {

    function fetchGenreId() {
      loadGenre().then(res => {
        getMovieByGenre(setMovieList,
          res.data.genres.find(item => item.name.toLowerCase() === query).id
        )
      });
    }

    animateScroll.scrollToTop({ smooth: true });
    fetchGenreId();
    setMenuSelected(query);
    return () => {
      clearMovie(setMovieList);
    }
  }, [query,
    setMenuSelected,
    setMovieList,
  ]);

  return (
    <>
      <MovieList header={query} movieList={movieList} />
    </>
  );
}

export default Genre;
