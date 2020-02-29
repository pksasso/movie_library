import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Loader from './Loader';

import { MovieContext } from '../contexts/MovieContext';

const Content = styled(Link)`
  text-decoration: none;
  display: flex;
  height: 100%;
  background-color: transparent;
  flex-direction: column;
  transition: all 300ms cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: all 300ms cubic-bezier(0.215, 0.61, 0.355, 1);
  :hover{
    background-color:#171e22; 
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
  box-shadow: 0px 0px 23px 2px rgba(0,0,0,0.75);
`;

const MovieLost = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: grey;
  border-radius: 0.8rem;
  ${Content}:hover &{
    box-shadow: 0px 0px 118px -80px rgba(255,255,255,0.29);
  }
`;

const Title = styled.h2`
  text-align: center;
  font-size: 16px;
  font-family: 'Montserrat';
  margin: 0;
  padding: 15px 0 15px 0;
  font-weight: 500;
  color: #fff;
`;
const Vote = styled.h2`
  text-align: center;
  font-size: 16px;
  font-family: 'Montserrat';
  margin: 0;
  font-weight: 500;
  color: #121212;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
`;


const ImageDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const VoteBubble = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 25px;
  width: 50px;
  text-align: center;
  background-color: ${ props => handlerVoteColor(props.vote)};
  border-radius: 15px;
  transform: translateY(-12.5px);
`;

const handlerVoteColor = (vote) => {
  if (vote >= 7) { return '#25ce98' }
  if (vote < 7 && vote >= 5) { return '#ffb20a' }
  if (vote < 5) { return '#FC4C54' }
}

function Item({ movie }) {
  const { setMenuSelected, setMovieSelected } = useContext(MovieContext);

  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && movie.poster_path ? <Loader /> : null}
      <Content
        to={`/movie/${movie.id}`}
        onClick={() => {
          setMovieSelected(movie.id.toString());
          setMenuSelected('');
        }}
      >{movie.poster_path ?
        <ImageDiv>
          <MovieImg
            src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
            alt="poster"
            onLoad={() => setIsLoading(false)}
          />
          <VoteBubble vote={parseInt(movie.vote_average)}>
            <Vote>
              {movie.vote_average}
            </Vote>
          </VoteBubble>

        </ImageDiv>
        : <MovieLost><Title>Without img</Title></MovieLost>}

        <Details>
          <Title>{movie.title}</Title>
        </Details>
      </Content>
    </>
  );
}

export default Item;