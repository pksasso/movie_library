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
  //const [sortBy, setSortBy] = useState('popularity.desc')

  const {
    setMenuSelected,
    movieList,
    setMovieList,
    totalPages,
    setTotalPages,
    dropdownSelected,
    setDropdownSelected,
  } = useContext(MovieContext);

  const query = match.params.name.replace(/\s+/g, ' ').toLowerCase();
  const queryData = useQuery();
  const pageNumber = parseInt(queryData.get("page"));
  const queryPage = queryData.get("page");

  useEffect(() => {
    setDropdownSelected({ id: 1, title: "popularity", type: "desc" });
  }, [query, setDropdownSelected])

  useEffect(() => {


    if (dropdownSelected !== { id: 1, title: "popularity", type: "desc" }) {
      console.log('alog')
      fetchGenreId();
    }
    // eslint-disable-next-line
  }, [dropdownSelected])

  useEffect(() => {



    if (!isNaN(pageNumber)) {
      setPage(pageNumber);
    } else {
      setPage(1);
    }

    animateScroll.scrollToTop({ smooth: true });
    if (dropdownSelected === { id: 1, title: "popularity", type: "desc" }) {

      fetchGenreId();
    }

    setMenuSelected(query);
    return () => {
      clearMovie(setMovieList);
      setDropdownSelected({ id: 1, title: "popularity", type: "desc" });
    }
  }, [query,
    setMenuSelected,
    setMovieList,
    setTotalPages,
    page,
    pageNumber,
    queryPage,
  ]);

  function fetchGenreId() {
    loadGenre().then(res => {
      getMovieByGenre(setMovieList,
        res.data.genres.find(item => item.name.toLowerCase() === query).id,
        queryPage, setTotalPages, `${dropdownSelected.title.toLowerCase()}.${dropdownSelected.type}`
      )
    });
  }

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
        drop={true}
        setDropdownSelected={setDropdownSelected}
        dropdownSelected={dropdownSelected}
      />
    </Wrapper>
  );
}

export default Genre;
