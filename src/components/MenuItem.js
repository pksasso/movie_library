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
    transition: all 300ms cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: all 300ms cubic-bezier(0.215, 0.61, 0.355, 1);
  :hover{
    border-color: #c7c7c7;
    border-style: solid;
    border-width: 1px;
    border-radius: 15px;
    cursor: pointer;
  }
`;

const ItemTitle = styled.h2`
  font-family: 'Montserrat';
  font-weight: 500;
  font-size: 15px;
  color: #fff;
  transition: all 300ms cubic-bezier(0.645, 0.045, 0.355, 1);
  ${Item}:hover &{
    transform: scale(1.05);
  }
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
