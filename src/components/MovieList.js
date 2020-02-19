import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

//import api from '../api/api';
import Item from './MovieItem';

const List = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit,minmax(5rem, 14rem));
  justify-content: space-evenly;
  align-content:space-between;
  padding: 76px 20px 0px 20px ; 
  grid-gap: 25px;
`;

function MovieList({ list }) {

  const [moviesList, setMoviesList] = useState([]);

  useEffect(() => {
    setMoviesList(list)

  }, [list]);

  // useEffect(() => {
  //   async function loadData() {
  //     const res = await api.get(`/movie/popular`);
  //     //console.log(res);
  //     setpopularMovies(res.data.results);
  //   }
  //   loadData();
  // }, []);



  return (
    <>
      <List>
        {moviesList.map(movie => { return <Item movie={movie} key={movie.id} /> })}
      </List>
    </>
  );
}

export default MovieList;
