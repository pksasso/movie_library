import React, { useState } from 'react';
import styled from 'styled-components';

import MovieList from './components/MovieList';
import SideBar from './components/SideBar';

const Body = styled.div`
  display: flex;
  position: flex;
`;

function App() {

  const [selected, setSelected] = useState('popular');

  return (
    <>
      <Body>
        <SideBar changeItem={setSelected} />
        <MovieList route={selected} />
      </Body>
    </>
  );
}

export default App;
