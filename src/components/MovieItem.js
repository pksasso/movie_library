import React, { useState } from 'react';
import styled from 'styled-components';
import Loader from './Loader';

const Content = styled.div`
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
  font-weight: 500;
  color: #fff;
`;

const Details = styled.div`
`;


function Item({ movie }) {

  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading ? <Loader /> : null}
      <Content>
        <MovieImg
          src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
          alt="poster"
          onLoad={() => setIsLoading(false)}
        />
        <Details>
          <Title>{movie.title}</Title>
          <Title>{movie.vote_average}</Title>
        </Details>
      </Content>
    </>
  );
}

export default Item;