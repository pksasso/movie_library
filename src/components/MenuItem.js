import React from 'react';
import styled from 'styled-components';

const Item = styled.div`
  height: 50px;
  display:flex;
  padding-left: 15px;
  align-items: center;
  justify-content: start;
  :hover{
    border-color: #c7c7c7;
    border-style: solid;
    border-width: 1px;
    border-radius: 10px;
    cursor: pointer;
  }
`;

const ItemTitle = styled.h2`
  font-family: 'Montserrat';
  font-weight: 500;
  font-size: 15px;
  color: #fff;
`;

function verifyText(text) {
  switch (text) {
    case 'popular':
      return 'popular'
      break;
    case 'top rated':
      return 'top_rated'
      break;
    case 'upcoming':
      return 'upcoming'
      break;
  }
}



function MenuItem({ genre, title, change }) {
  return (
    <div>
      <Item onClick={() => change(title ? verifyText(title.toLowerCase()) : null)} ><ItemTitle>{title ? title : genre.name}</ItemTitle></Item>

    </div>
  );
}

export default MenuItem;
