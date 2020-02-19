import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { getMovie, getMovieByGenre } from './connections/connections';
import MovieList from './components/MovieList';
import SideBar from './components/SideBar';

const Body = styled.div`
  display: flex;
  position: flex;
`;

function App() {

  const [selected, setSelected] = useState('popular');
  const [genreId, setGenreId] = useState('');
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    function handleRoute() {
      switch (selected) {
        case 'top_rated':
          getMovie(setMovieList, selected);
          break;
        case 'popular':
          getMovie(setMovieList, selected);
          break;
        case 'upcoming':
          getMovie(setMovieList, selected);
          break;
        default:
          console.log(genreId.toString());
          getMovieByGenre(setMovieList, genreId.toString());
          break;
      }
    }
    handleRoute();
  }, [selected, setMovieList, genreId]);

  return (
    <>
      <Body>
        <SideBar
          selected={selected}
          setSelected={setSelected}
          setGenreId={setGenreId}
        />
        <MovieList list={movieList} selected={selected} />
      </Body>
    </>
  );
}

export default App;
