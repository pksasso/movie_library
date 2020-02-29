import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { animateScroll } from 'react-scroll';

import { getMovieDetails } from '../connections/connections';
import star from '../assets/star.svg';

import { MovieContext } from '../contexts/MovieContext';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: min-content;
`;

const MovieImg = styled.img`
  width: 100%;
  max-height: 100%;
  max-width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
  border-radius: 0.8rem;
`;

const WrappImage = styled.div`
  width: 100%;
  max-width: 33%;
  flex: 1 1 40%;
  align-items: center;
  justify-content: center;
  display: flex;
  padding: 4rem;
`;

const Title = styled.h3`
  color: #fff;
  font-family: 'Montserrat';
  font-size: 32px;
  margin: 0;
  padding: 0;
`;

const InfoWrapper = styled.div`
  width:50%;
  display: flex;
  flex-direction: column;
  height: min-content;
  padding-top: 50px;
`;

const Tagline = styled.h3`
  color: #ababab;
  margin: 0;
  padding: 0;
  font-family: 'Montserrat';
  font-size: 20px;
`;

const Overview = styled.p`
  color: #ababab;
  margin: 0;
  padding-top: 30px;
  font-family: 'Montserrat';
`;

const StarsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-top: 7px;
  
`;

const StartImg = styled.img`
  height: 17px;
`;

const Vote = styled.p`
  color: #fff;
  font-family: 'Montserrat';
`;

const GenreList = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 0;
  padding: 0;
  height: min-content;
  
`;

const LinkWrap = styled(Link)`
  text-decoration:none;
  :not(:first-child) {
    margin-left: 7px;  
  }
`;

const GenreItem = styled.p`
  margin:0;
  color:#fff;
  width: min-content;
  border: 1px solid #fff;
  border-radius: 15px;
  padding: 5px 10px 5px 10px;
  
  overflow: hidden;
  white-space: nowrap;
`;

function Movie({ match }) {
  const { setMenuSelected } = useContext(MovieContext);
  const [movie, setMovie] = useState({})

  useEffect(() => {
    animateScroll.scrollToTop({ smooth: true });
    setMenuSelected('');
    setMovie(getMovieDetails(match.params.id, setMovie));
  }, [match.params.id, setMenuSelected]);

  function splitYear(date) {
    if (!date) {
      return;
    }
    const [year] = date.split('-');
    return year;
  }

  function renderGenre(genres) {
    if (!genres) {
      return
    } else {

      return genres.map(genre => (
        <LinkWrap
          key={genre}
          to={`/genres/${genre.name}`}
        >
          <GenreItem>{genre.name}</GenreItem>
        </LinkWrap>
      ));
    }
  }

  return (
    <>
      <Wrapper>
        <WrappImage>
          <MovieImg src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
            alt="poster" />
        </WrappImage>
        <InfoWrapper>
          <Title>{movie.title + ' (' + splitYear(movie.release_date) + ')'}</Title>
          <Tagline>{movie.tagline}</Tagline>
          <StarsWrapper>
            <StartImg src={star} alt="star" />
            <Vote>{movie.vote_average + '/10'}</Vote>
          </StarsWrapper>
          <GenreList>
            {renderGenre(movie.genres)}
          </GenreList>
          <Overview>{movie.overview}</Overview>
        </InfoWrapper>
      </Wrapper>
    </>
  )
}

export default Movie;