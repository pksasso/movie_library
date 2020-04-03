import React, { useContext } from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import MenuItem from './MenuItem';

import { MovieContext } from '../contexts/MovieContext';

const staticCategories = ['Popular', 'Top Rated', 'Upcoming'];

const LinkWrap = styled(Link)`
  text-decoration:none;
`;

const Wrapper = styled.div`
  width: 200px;
  background: #171e22;
  margin-top: 50px;
  padding-top: 25px;
  height: ${({ size }) => `${size - 70}px`};
  overflow-y: scroll;
  transition: transform 0.3s ease-in-out;
  transform: ${({ open }) => open ? 'translateX(0%)' : 'translateX(-100%)'};
`;

const Heading = styled.h2`
  font-weight: 700;
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: -0.5px;
  color: #fff;
  margin: 0 0 1rem 1rem;
  &:not(:first-child) {
    margin-top: 3rem;
  }
`;

function Drawer({ open, setOpen }) {

  const {
    menuSelected,
    genreList } = useContext(MovieContext);

  function renderStaticCategories() {
    return staticCategories.map(categorie =>
      <LinkWrap
        key={categorie}
        to={`/discover/${categorie}`}
      >
        <MenuItem
          title={categorie}
          active={menuSelected === editWord(categorie) ? true : false}
          isStatic={true}
          setOpen={setOpen}
          open={open}
        />
      </LinkWrap>
    );
  }

  function editWord(word) {
    return word.toLowerCase().split(' ').join('_');
  }

  return (
    <>
      <Wrapper
        open={open}
        size={window.innerHeight}
      >
        <Heading>Discover</Heading>
        {renderStaticCategories()}
        <Heading>Genres</Heading>
        {genreList.map(gen =>
          <LinkWrap
            to={`/genres/${gen.name}`}
            key={gen.id}
          >
            <MenuItem
              genre={gen}
              active={menuSelected === gen.name.toLowerCase() ? true : false}
              isStatic={false}
              setOpen={setOpen}
              open={open}
            />
          </LinkWrap>
        )}
      </Wrapper>
    </>
  )
}

export default Drawer;
