import React, { useEffect } from 'react';
import styled from 'styled-components';

import Item from './MovieItem';

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

const MoviesText = styled.h2`
  font-weight: 700;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: -0.5px;
  margin: 0;
  color: #fff;
  margin: 0 0 1rem 1rem;
`;

const PageTitle = styled.h2`
  font-weight: 200;
  font-size: 25px;
  text-transform: uppercase;
  letter-spacing: -0.5px;
  color: #fff;
  margin: 15px 0 0 15px;
`;

const HeaderWrapper = styled.div`
 margin-bottom: 25px;
`;

function MovieList({ header, movieList }) {

  useEffect(() => {
  }, [movieList])

  function handleText(text) {
    return text.split('_').join(' ');
  }

  return (
    <Wrapper>
      <HeaderWrapper>
        <PageTitle>{handleText(header)}</PageTitle>
        <MoviesText>Movies</MoviesText>
      </HeaderWrapper>
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
