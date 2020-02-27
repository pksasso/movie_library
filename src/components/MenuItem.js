import React, { useContext } from 'react';
import styled from 'styled-components';

import { MovieContext } from '../contexts/MovieContext';

const Item = styled.div`
  height: 30px;
  display:flex;
  padding-left: 15px;
  margin: 5px;
  align-items: center;
  justify-content: start;
  border-color: ${props => (props.active ? '#c7c7c7' : 'transparent')};
    border-style: solid;
    border-width: 1px;
    border-radius: 15px;
  :hover{
    border-color: #c7c7c7;
    border-style: solid;
    border-width: 1px;
    border-radius: 15px;
    background-color: #171717;
    box-shadow: 0px 0px 13px 0px rgba(148,148,148,1);
    cursor: pointer;
  }
`;

const ItemTitle = styled.h2`
  font-family: 'Montserrat';
  font-weight: 500;
  font-size: 15px;
  color: #fff;
`;

function MenuItem({ genre, title, active, isStatic }) {

  const { setMenuSelected } = useContext(MovieContext);

  function editWord(word) {
    return word.toLowerCase().split(' ').join('_');
  }

  function handleChangeItem() {
    if (isStatic) {
      setMenuSelected((editWord(title)));
    } else {
      setMenuSelected(genre.name.toLowerCase());
    }
  }

  return (
    <div>
      <Item
        active={active}
        static={isStatic}
        onClick={handleChangeItem} >
        <ItemTitle>{title ? title : genre.name}</ItemTitle>
      </Item>
    </div>
  );
}

export default MenuItem;
