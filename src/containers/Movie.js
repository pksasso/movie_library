import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { animateScroll } from 'react-scroll';

import { getMovieDetails, getMovieRecommendations, clearMovie } from '../connections/connections';
import MovieList from '../components/MovieList';
import Loader from '../components/Loader';

import { MovieContext } from '../contexts/MovieContext';

const Wrapper = styled.div`
  display: flex;
  flex-direction:column;
  width:100%;
  height:100%;
`;

const MovieWrapper = styled.div`
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
  font-weight:400;
  font-size: 28px;
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
  font-weight: 400;
  font-size: 20px;
`;

const Overview = styled.p`
  color: #ababab;
  margin: 0;
  padding-top: 30px;
  font-family: 'Montserrat';
`;

const GenreList = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 20px 0 0 0;
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
  background-color: #171e22;
  width: min-content;
  box-shadow: 0px 0px 23px -8px rgba(0,0,0,0.75);
  border-radius: 15px;
  padding: 5px 10px 5px 10px;
  overflow: hidden;
  white-space: nowrap;
  transition: all 300ms;
  :hover{
    box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.75);
    transform: translateY(-3px)
  }
`;

const Infos = styled.div`
  display: flex;
  flex-direction:row;
  align-items:center;
  justify-content:space-evenly;
  box-shadow: 0px 0px 23px -8px rgba(0,0,0,0.75);
  width:100%;
  height:90px ;
  margin: 25px 0 0 0;
  background-color: ${props => handlerVoteColor(props.vote)};
`;

const InfoDetails = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  flex-direction:column;
  color:#222b31;
  font-family: 'Montserrat';
  font-weight:400;
  font-size: 16px;
`;

const InfoText = styled.h2`
  margin:0;
  font-family: 'Montserrat';
  font-weight: 700;
`;

const ReleaseDate = styled.h2`
  color: #fff;
  font-family: 'Montserrat';
  font-weight:400;
  font-size:16px;
`;

const handlerVoteColor = (vote) => {
  if (vote >= 7) { return '#25ce98' }
  if (vote < 7 && vote >= 5) { return '#ffb20a' }
  if (vote < 5) { return '#FC4C54' }
}

function Movie({ match }) {
  const { setMenuSelected } = useContext(MovieContext);
  const [movie, setMovie] = useState({})
  const [recommendations, setRecommendations] = useState([]);
  const [movieLoading, setMovieLoading] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    animateScroll.scrollToTop({ smooth: true });
    setMenuSelected('');
    getMovieRecommendations(setRecommendations, match.params.id, setIsLoading);
    getMovieDetails(match.params.id, setMovie, setMovieLoading);
    return () => {
      clearMovie(setRecommendations);
    }
  }, [match.params.id, setMenuSelected]);

  function formatDate(date) {
    return date.split('-').reverse().join('/');
  }

  function renderGenre(genres) {
    if (!genres) {
      return
    } else {
      return genres.map(genre => (
        <LinkWrap
          key={genre.id}
          to={`/genres/${genre.name}`}
        >
          <GenreItem>{genre.name}</GenreItem>
        </LinkWrap>
      ));
    }
  }

  return (
    <Wrapper>
      {movieLoading
        ? <Loader />
        : <MovieWrapper>
          <WrappImage>
            <MovieImg
              src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
              alt="poster" />
          </WrappImage>
          <InfoWrapper>
            <Title>
              {movie.title}
            </Title>
            <Tagline>{movie.tagline}</Tagline>
            <ReleaseDate>
              {formatDate(movie.release_date)}
            </ReleaseDate>
            <GenreList>
              {renderGenre(movie.genres)}
            </GenreList>
            <Infos vote={parseInt(movie.vote_average)}>
              <InfoDetails>
                Runtime
                <InfoText>
                  {movie.runtime + 'min'}
                </InfoText>
              </InfoDetails>
              <InfoDetails>
                Rating
                  <InfoText>
                  {movie.vote_average}
                </InfoText>
              </InfoDetails>
              <InfoDetails>
                Revenue
                  <InfoText>
                  {'U$' + movie.revenue}
                </InfoText>
              </InfoDetails>
            </Infos>
            <Overview>{movie.overview}</Overview>
          </InfoWrapper>
        </MovieWrapper>
      }
      {
        isLoading
          ? <Loader />
          : <MovieList
            header={'Recommendation'}
            movieList={recommendations}
          />
      }
    </Wrapper>
  )
}

export default Movie;