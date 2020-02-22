import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';

//import api from '../api/api';
import { MovieContext } from '../contexts/MovieContext';
import Item from './MovieItem';

import {
  getMovie,
  getMovieByGenre
} from '../connections/connections';

const List = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit,minmax(5rem, 14rem));
  justify-content: space-evenly;
  align-content:space-between;
  padding: 0px 20px 0px 20px ; 
  grid-gap: 25px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 12px;
  width: 100%;
`;

const Heading = styled.h2`
  font-weight: 700;
  padding-left: 50px;
  width:100%;
  display:flex;
  align-items:center;
  height: 100px;
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: -0.5px;
  color:#fff;
  margin: 0 0 1rem 1rem;
`;


function MovieList() {

  const { selected, setSelected, genreId } = useContext(MovieContext);
  const [moviesList, setMoviesList] = useState([]);


  useEffect(() => {
    function handleRoute() {
      switch (selected) {
        case 'popular':
          getMovie(setMoviesList, selected);
          break;
        case 'top_rated':
          getMovie(setMoviesList, selected);
          break;
        case 'upcoming':
          getMovie(setMoviesList, selected);
          break;
        default:
          getMovieByGenre(setMoviesList, genreId.toString());
          break;
      }
    }
    handleRoute();
  }, [selected, setMoviesList, genreId]);

  function handleText(text) {
    return text.split('_').join(' ');
  }

  return (
    <Wrapper>
      <Heading>{handleText(selected)} Movies</Heading>
      <List>
        {moviesList.map(
          movie => {
            return <Item
              movie={movie}
              key={movie.id}
              setSelected={setSelected}
            />
          })}
      </List>
    </Wrapper>
  );
}

export default MovieList;