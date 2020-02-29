import React, { useContext } from 'react';
import styled from 'styled-components';

import { MovieContext } from '../contexts/MovieContext';

const Item = styled.div`
  height: 35px;
  display: flex;
  padding-left: 15px;
  align-items: center;
  background-color: ${props => (props.active ? '#222b31' : '')};
  transition: all 300ms; 
  :hover{
    background-color: #222b31;
    cursor: pointer;
  }
`;

const ItemTitle = styled.h2`
  font-family: 'Montserrat';
  font-weight: 400;
  font-size: 15px;
  color: #fff;
  transition: all 300ms;
  transform: ${props => (props.active ? 'translateX(15px)' : 'translateX(0)')};
  ${Item}:hover &{
    transform: translateX(15px)
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
        <ItemTitle active={active} >
          {title ? title : genre.name}
        </ItemTitle>
      </Item>
    </div>
  );
}

export default MenuItem;
