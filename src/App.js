import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Discover from './containers/Discover';

import { getMovie, getMovieByGenre } from './connections/connections';
import MovieList from './components/MovieList';
import SideBar from './components/SideBar';


const Body = styled.div`
  display: flex;
  flex-direction:row;
`;

function App() {

  const [selected, setSelected] = useState('popular');
  const [genreId, setGenreId] = useState('');
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    function handleRoute() {
      switch (selected) {
        case 'popular':
          getMovie(setMovieList, selected);
          break;
        case 'top_rated':
          getMovie(setMovieList, selected);
          break;
        case 'upcoming':
          getMovie(setMovieList, selected);
          break;
        default:
          getMovieByGenre(setMovieList, genreId.toString());
          break;
      }
    }
    handleRoute();
  }, [selected, setMovieList, genreId]);

  return (
    <>
      <Router>
        <Body>
          <SideBar
            selected={selected}
            setSelected={setSelected}
            setGenreId={setGenreId}
          />
          <Switch>
            <Route
              path="/"
              exact
              render={() => (<Redirect from={'/'} to={'/discover/popular'} />)}
            >
            </Route>
            <Route
              path={'/discover/:name'}
              exact
            >
              <Discover
                list={movieList}
                selected={selected}
                setSelected={setSelected}
              />
            </Route>
            <Route
              path={'/genres/:name'}
              exact
            >
              <MovieList
                list={movieList}
                selected={selected}
                setSelected={setSelected}
              />
            </Route>
          </Switch>
        </Body>
      </Router>
    </>
  );
}

export default App;
