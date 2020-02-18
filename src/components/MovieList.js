import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import api from '../api/api';
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

function MovieList(props) {

  const [popularMovies, setpopularMovies] = useState([]);

  useEffect(() => {
    async function loadData() {
      const res = await api.get(`/movie/${props.route}`);
      setpopularMovies(res.data.results);
    }
    loadData();
  }, [props.route]);

  return (
    <>
      <List>
        {popularMovies.map(movie => { return <Item movie={movie} key={movie.id} /> })}
      </List>
    </>
  );
}

export default MovieList;
