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
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width:100%;
  margin: 0 auto;
  @media (max-width: 900px) {
    margin-top: 75px;
  }
`;

const MovieWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content:center;
  
  width: 100%;
  height: min-content;
  @media (max-width: 768px) {
    flex-direction:column;
    align-items:center;
  }
`;

const MovieImg = styled.img`
  max-height:100%;
  height: auto;
  object-fit: cover;
  max-width:100%;
  border-radius: 0.8rem;
`;

const WrappImage = styled.div`
  width: 100%;
  max-width:35%;
  align-items:center;
  height:auto;
  flex: 1 1 40%;
  display: flex;
  padding: 25px;
  @media (max-width: 768px) {
    padding: 0px;
    max-width:50%;
  }
  @media (max-width: 500px) {
    padding: 0px;
    max-width:60%;
  }
`;

const Title = styled.h3`
  color: #fff;
  font-family: 'Montserrat';
  font-weight:400;
  font-size: 28px;
  margin: 0;
  padding: 0;
  @media (max-width: 768px) {
    font-size:20px;
    margin: 0 15px 0 15px;
  }
`;

const InfoWrapper = styled.div`
  
  margin-top:25px;
  margin-right:25px;
  width:100%;
  flex: 1 1 60%;
  @media (max-width: 768px) {
    width:100%;
    margin-right:0;
  }
`;

const Tagline = styled.h3`
  color: #ababab;
  
  padding: 0;
  font-family: 'Montserrat';
  font-weight: 400;
  font-size: 20px;
  @media (max-width: 768px) {
    font-size:16px;
    margin: 0 15px 0 15px;
  }
`;

const Overview = styled.p`
  color: #ababab;
  margin: 0;
  padding-top: 30px;
  font-family: 'Montserrat';
  @media (max-width: 768px) {
    
    margin: 0 15px 0 15px;
  }
`;

const GenreList = styled.div`
  display: flex;
  flex-wrap:wrap;
  flex-direction: row;
  width: 100%;
  margin: 20px 0 0 0;
  padding: 0;
  height: min-content;
  @media (max-width: 768px) {
    font-size:14px
  }
  
`;

const LinkWrap = styled(Link)`
  text-decoration:none;
  :not(:first-child) {
    margin-left: 7px;  
  }
`;

const GenreItem = styled.p`
  margin:5px;
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
  height:90px ;
  margin-top:25px;
  background-color: ${props => handlerVoteColor(props.vote)};
  @media (max-width: 768px) {
    margin-left:0;
  }
`;

const BarInfos = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  flex-direction:column;
  color:#222b31;
  font-family: 'Montserrat';
  font-weight:400;
  font-size: 16px;
  @media (max-width: 768px) {
    font-size:14px;
  }
`;

const BarText = styled.h2`
  margin:0;
  font-family: 'Montserrat';
  font-weight: 700;
`;

const ReleaseDate = styled.h2`
  color: #fff;
  font-family: 'Montserrat';
  font-weight:400;
  font-size:16px;
  @media (max-width: 768px) {
    margin: 0 15px 0 15px;
  }
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

  function formatRevenue(value) {

    const billion = Math.floor(value / 1000000000);
    let million = Math.floor(value / 1000000) - (billion * 1000);
    const thousands = Math.floor(value / 100000) - (million * 10)

    if (billion > 0 && Math.floor(million / 100) === 0) {
      million = '0' + million;
    }

    if (billion > 0) {
      return `U$ ${billion},${million} B`
    }

    if (million > 0) {
      return `U$ ${million},${thousands} M`;
    }

    if (value === 0) {
      return 'Uninformed';
    }

    return value;
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
              <BarInfos>
                Runtime
                <BarText>
                  {movie.runtime + 'min'}
                </BarText>
              </BarInfos>
              <BarInfos>
                Rating
                  <BarText>
                  {movie.vote_average}
                </BarText>
              </BarInfos>
              <BarInfos>
                Revenue
                  <BarText>
                  {formatRevenue(movie.revenue)}
                </BarText>
              </BarInfos>
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