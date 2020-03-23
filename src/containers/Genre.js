import React, { useEffect, useContext } from 'react';
import { animateScroll } from 'react-scroll';
import styled from 'styled-components';

import MovieList from '../components/MovieList';
import { getMovieByGenre, clearMovie, loadGenre } from '../connections/connections';

import { MovieContext } from '../contexts/MovieContext';

const Wrapper = styled.div`
    width: 100%;
  @media (max-width: 900px){
    margin-top:50px;
  }
`;

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
    <Wrapper>
      <MovieList header={query} movieList={movieList} />
    </Wrapper>
  );
}

export default Genre;
