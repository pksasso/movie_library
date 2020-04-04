import React, { useState, useEffect, useContext } from 'react';
import { animateScroll } from 'react-scroll';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

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

  const [page, setPage] = useState(1);

  const {
    setMenuSelected,
    movieList,
    setMovieList,
    totalPages,
    setTotalPages } = useContext(MovieContext);

  const query = match.params.name.replace(/\s+/g, ' ').toLowerCase();
  const queryData = useQuery();
  const pageNumber = parseInt(queryData.get("page"));
  const queryPage = queryData.get("page");

  useEffect(() => {

    function fetchGenreId() {
      loadGenre().then(res => {
        getMovieByGenre(setMovieList,
          res.data.genres.find(item => item.name.toLowerCase() === query).id,
          queryPage, setTotalPages
        )
      });
    }

    if (!isNaN(pageNumber)) {
      setPage(pageNumber);
    } else {
      setPage(1);
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
    setTotalPages,
    page,
    pageNumber,
    queryPage
  ]);

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  return (
    <Wrapper>
      <MovieList
        header={query}
        movieList={movieList}
        actualPage={page}
        setPage={setPage}
        maxPage={totalPages}
      />
    </Wrapper>
  );
}

export default Genre;
