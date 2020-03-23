import React, { useEffect, useContext } from 'react';
import { animateScroll } from 'react-scroll';
import styled from 'styled-components';

import MovieList from '../components/MovieList';
import { getMovie } from '../connections/connections';

import { MovieContext } from '../contexts/MovieContext';

const Wrapper = styled.div`
  width: 100%;
  @media (max-width: 900px){
    margin-top:50px;
  }
`;

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
      <Wrapper>
        <MovieList header={query} movieList={movieList} />
      </Wrapper>
    </>
  );
}

export default Discover;
