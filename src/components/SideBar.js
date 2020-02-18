import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import api from '../api/api';

import MenuItem from './MenuItem';

const Wrapper = styled.div`
  margin: 10px 10px 10px 10px;
  padding: 15px 0 25px 0;
  display: inline-block;
  height: min-content;
  width: 200px;
  background-color: #272727;
  border-radius: 10px;
  box-shadow: 0px 0px 100px -60px rgba(255,255,255,0.29);
`;

const LogoDiv = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
`;

const Logo = styled.div`
  display: flex;
  align-content:center;
  height: 75px;
  width: 75px;
  border-radius: 5px;
  background-color: #c7c7c7;
`;

const Gap = styled.div`
  height: 40px;
`;

// import { Container } from './styles';

function SideBar(props) {
  const [genre, setGenre] = useState([]);

  useEffect(() => {
    async function loadGenre() {
      const res = await api.get(`/genre/movie/list`);
      setGenre(res.data.genres);
    }

    loadGenre();
  }, []);

  return (
    <>
      <Wrapper>
        <LogoDiv>
          <Logo />
        </LogoDiv>
        <MenuItem title="Popular" change={props.changeItem} />
        <MenuItem title="Top Rated" change={props.changeItem} />
        <MenuItem title="Upcoming" change={props.changeItem} />
        <Gap />
        {genre.map(gen => <MenuItem genre={gen} key={gen.id} change={props.changeItem} />)}
      </Wrapper>
    </>
  );
}

export default SideBar;
