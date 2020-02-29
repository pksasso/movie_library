import React, { useEffect } from 'react';
import styled from 'styled-components';

import Item from './MovieItem';
import Header from './Header';

const List = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit,minmax(5rem, 14rem));
  justify-content: space-evenly;
  align-content: space-between;
  padding: 0px 20px 0px 20px ; 
  grid-row-gap: 50px;
  grid-column-gap: 20px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 12px;
  width: 100%;
`;

function MovieList({ header, movieList }) {

  useEffect(() => {
  }, [movieList])

  function handleText(text) {
    return text.split('_').join(' ');
  }

  return (
    <Wrapper>
      <Header title={handleText(header)} subtitle='Movies' />
      <List>
        {movieList.map(
          movie => {
            return <Item
              movie={movie}
              key={movie.id}
            />
          })}
      </List>
    </Wrapper>
  );
}

export default MovieList;
