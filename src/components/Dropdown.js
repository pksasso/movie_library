import React from 'react'
import styled from 'styled-components';
import { FiArrowDown, FiArrowUp } from 'react-icons/fi';
import onclickOutSide from 'react-onclickoutside';

const options = [
  {
    id: 1,
    title: "popularity",
    type: "desc"
  },
  {
    id: 2,
    title: "popularity",
    type: "asc"
  },
  {
    id: 3,
    title: "vote_average",
    type: "asc"
  },
  {
    id: 4,
    title: "vote_average",
    type: "desc"
  },
  {
    id: 5,
    title: "original_title",
    type: "asc"
  },
  {
    id: 6,
    title: "original_title",
    type: "desc"
  },
  {
    id: 7,
    title: "revenue",
    type: "asc"
  },
  {
    id: 8,
    title: "revenue",
    type: "desc"
  },
  {
    id: 9,
    title: "release_date",
    type: "asc"
  },
  {
    id: 10,
    title: "release_date",
    type: "desc"
  },

];

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 0;
  cursor: pointer;
  z-index: 1;
`;

const Title = styled.div`
  width: 200px;
  height: 50px;
  margin-top: 15px;
  margin-right: 20px;
  background-color: #171e22;
  z-index: 1;
  display: flex;
  align-items: center;
  color: white;
  transition: 0.3s ease-in-out;
  border-radius: ${props => props.open ? '12px 12px 0px 0px' : '12px 12px 12px 12px'};
  padding-left: 10px;
  cursor: pointer;
  box-shadow: 0px 0px 23px -8px rgba(0,0,0,0.75);
`;

const List = styled.div`
  background-color: #171e22;
  margin-right: 20px;  
  box-shadow: 0px 0px 23px -8px rgba(0,0,0,0.75);
  border-radius: 0px 0px 12px 12px;
`;

const ListItem = styled.div`
  display:flex;
  align-items:center;
  height: 50px;
  padding-left: 10px;
  color: #fff;
  border-radius: 12px;
  :hover {
    background-color: #222b31;
    border-radius:0px;
    font-weight: 500;
  }
  :nth-last-child(1){
    border-radius: 0px 0px 12px 12px;
  }
`;

function Dropdown({ open, setOpen, dropdownSelected, setDropdownSelected }) {

  Dropdown.handleClickOutside = () => setOpen(false);

  function handleSelected(option) {
    setDropdownSelected(option);
  }

  function formatWord(word) {
    let finalWord = '';

    word.split('_').map(
      part =>
        finalWord = finalWord +
        part.charAt(0).toUpperCase() +
        part.slice(1) + ' '
    );

    return finalWord;
  }

  return (
    <Wrapper
      open={open}
      onClick={() => setOpen(!open)}
    >
      <Title
        open={open}
      >
        {dropdownSelected.type === 'asc' ? <FiArrowUp /> : <FiArrowDown />}
        {formatWord(dropdownSelected.title)}
      </Title>

      {open ?
        <List>
          {options.map(option => (
            option.id !== dropdownSelected.id ?
              <ListItem key={option.id} onClick={() => handleSelected(option)}>
                {option.type === 'asc' ? <FiArrowUp /> : <FiArrowDown />}
                {' ' + formatWord(option.title)}
              </ListItem> :
              <div key={option.id}></div>
          ))}
        </List> :
        <div></div>
      }
    </Wrapper>
  );
}

const clickOutsideConfig = {
  handleClickOutside: () => Dropdown.handleClickOutside,
};

export default onclickOutSide(Dropdown, clickOutsideConfig);