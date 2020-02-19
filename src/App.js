import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { getMovie } from './connections/connections';
import MovieList from './components/MovieList';
import SideBar from './components/SideBar';

const Body = styled.div`
  display: flex;
  position: flex;
`;

function App() {


  const [selected, setSelected] = useState('popular');
  const [genreId, setgenreId] = useState('');
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
        />
        <MovieList list={movieList} />
      </Body>
    </>
  );
}

export default App;
