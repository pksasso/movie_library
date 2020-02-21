import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import api from '../api/api';
import setSelectedMenu from '../functions/index';

import MenuItem from './MenuItem';

const staticCategories = ['Popular', 'Top Rated', 'Upcoming']

const Wrapper = styled.div`
  margin: 10px 10px 10px 10px;
  padding: 15px 0 25px 0;
  display: flex;
  flex-direction: column;
  height: min-content;
  width: 170px;
  background-color: #272727;
  border-radius: 10px;
  box-shadow: 0px 0px 100px -60px rgba(255,255,255,0.29);
`;

const LogoDiv = styled.div`
  width: 170px;
  height: 100px;
  display: flex;
  justify-content: center;
`;

const Logo = styled(Link)`
  display: flex;
  align-content:center;
  height: 75px;
  width: 75px;
  border-radius: 5px;
  background-color: #c7c7c7;
`;

const Heading = styled.h2`
  font-weight: 700;
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: -0.5px;
  color:#fff;
  margin: 0 0 1rem 1rem;
  &:not(:first-child) {
    margin-top: 3rem;
  }
`;

const LinkWrap = styled(Link)`
  text-decoration:none;

`;

function SideBar({ selected, setSelected, setGenreId }) {
  const [genre, setGenre] = useState([]);

  useEffect(() => {
    async function loadGenre() {
      const res = await api.get(`/genre/movie/list`);
      setGenre(res.data.genres);
    }
    loadGenre();
  }, []);

  function editWord(word) {
    return word.toLowerCase().split(' ').join('_');
  }

  function renderStaticCategories() {
    return staticCategories.map(categorie =>
      <LinkWrap
        key={categorie}
        to={`/discover/${categorie}`}
      >
        <MenuItem
          title={categorie}
          active={selected === editWord(categorie) ? true : false}
          setSelected={setSelected}
          isStatic={true}
        />
      </LinkWrap>
    );
  }

  return (
    <>
      <Wrapper>
        <LogoDiv>
          <Logo to={`/`} />
        </LogoDiv>
        <Heading>Discover</Heading>
        {renderStaticCategories()}
        <Heading>Genres</Heading>
        {genre.map(gen =>
          <LinkWrap
            to={`/genres/${gen.name}`}
            key={gen.id}
          >
            <MenuItem
              genre={gen}
              active={selected === gen.name ? true : false}
              setGenreId={setGenreId}
              setSelected={setSelected}
              isStatic={false}
            />
          </LinkWrap>
        )}
      </Wrapper>
    </>
  );
}

export default SideBar;
