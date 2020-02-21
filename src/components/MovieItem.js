import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Loader from './Loader';

import star from '../assets/star.svg';

const Content = styled(Link)`
  text-decoration:none;
  display:flex;
  background-color: transparent;
  flex-direction: column;
  transition: all 300ms cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: all 300ms cubic-bezier(0.215, 0.61, 0.355, 1);
  :hover{
    background-color:#1d1d1d; 
    border-radius:0.8rem;
    transform: scale(1.03);
    cursor: pointer;
  }
`;

const MovieImg = styled.img`
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
  border-radius: 0.8rem;
  ${Content}:hover &{
    box-shadow: 0px 0px 118px -80px rgba(255,255,255,0.29);
  }
`;

const Title = styled.h2`
  text-align: center;
  font-size: 16px;
  font-family: 'Montserrat';
  margin:0;
  padding-top:10px;
  font-weight: 500;
  color: #fff;
`;
const Vote = styled.h2`
  text-align: center;
  font-size: 16px;
  font-family: 'Montserrat';
  margin:0;
  padding-left:5px;
  font-weight: 500;
  color: #fff;
`;

const Details = styled.div`
  padding-bottom: 10px;
  display: flex;
  flex-direction:column;
`;

const StarsDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items:center;
  padding-top: 7px;
  justify-content:center;
`;

const StartImg = styled.img`
  height: 17px;
`;

function Item({ movie, setSelected }) {

  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading ? <Loader /> : null}
      <Content
        to={`/movie/${movie.id}`}
        onClick={() => setSelected('')}
      >
        <MovieImg
          src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
          alt="poster"
          onLoad={() => setIsLoading(false)}
        />
        <Details>
          <Title>{movie.title}</Title>
          <StarsDiv>
            <StartImg src={star} alt="star" />
            <Vote>{movie.vote_average} / 10</Vote>
          </StarsDiv>
        </Details>
      </Content>
    </>
  );
}

export default Item;