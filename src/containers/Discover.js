import React, { useState, useEffect, useContext } from 'react';
import { animateScroll } from 'react-scroll';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

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

  const [page, setPage] = useState(1);

  const {
    movieList,
    setMovieList,
    setMenuSelected,
    totalPages,
    setTotalPages } = useContext(MovieContext);

  const query = match.params.name.replace(/\s+/g, '_').toLowerCase();
  const queryData = useQuery();
  const pageNumber = parseInt(queryData.get("page"))
  const queryPage = queryData.get("page");

  useEffect(() => {
    if (!isNaN(pageNumber)) {
      setPage(pageNumber);
    } else {
      setPage(1);
    }

    animateScroll.scrollToTop({ smooth: true });
    getMovie(setMovieList, query, queryPage, setTotalPages);
    setMenuSelected(query);
  }, [match.params.name,
    query,
    setMenuSelected,
    setMovieList,
    setTotalPages,
    page,
    pageNumber,
    queryPage
  ]);

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  return (
    <>
      <Wrapper>
        <MovieList
          header={query}
          movieList={movieList}
          actualPage={page}
          setPage={setPage}
          maxPage={totalPages}
        />
      </Wrapper>
    </>
  );
}

export default Discover;
