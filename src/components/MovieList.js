import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Item from './MovieItem';
import Header from './Header';
import Pagination from './Pagination';
import Dropdown from './Dropdown';

const List = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit,minmax(5rem, 14rem));
  justify-content: space-evenly;
  align-content: space-between;
  padding: 0px 20px 0px 20px ; 
  grid-row-gap: 50px;
  grid-column-gap: 20px;
  @media (max-width: 768px) {
    grid-template-columns: 1;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 12px;
  width: 100%;
`;

const HeaderWrapper = styled.div`
  display:flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

function MovieList({
  header,
  movieList,
  actualPage,
  setPage,
  maxPage,
  drop,
  setDropdownSelected,
  dropdownSelected,
}) {

  const [open, setOpen] = useState(false);

  useEffect(() => {

  }, [movieList])

  function handleText(text) {
    return text.split('_').join(' ');
  }

  return (
    <Wrapper>
      <HeaderWrapper>
        <Header title={handleText(header)} subtitle='Movies' />
        {drop ?
          <Dropdown
            open={open}
            setOpen={setOpen}
            actualPage={actualPage}
            setDropdownSelected={setDropdownSelected}
            dropdownSelected={dropdownSelected}
          /> :
          <div></div>
        }
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
      <Pagination
        actualPage={actualPage}
        route={header}
        setPage={setPage}
        maxPage={maxPage}
      />
    </Wrapper>
  );
}

export default MovieList;
