import React, {
  useState,
  useEffect,
  useContext
} from 'react';
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import Discover from './containers/Discover';
import { MovieProvider, MovieContext } from './contexts/MovieContext';

import {
  getMovie,
  getMovieByGenre
} from './connections/connections';
import MovieList from './components/MovieList';
import SideBar from './components/SideBar';


const Body = styled.div`
  display: flex;
  flex-direction:row;
`;

function App() {
  const [movieList, setMovieList] = useState([])
  //const { selected, setSelected } = useContext(MovieContext);
  const [genreId, setGenreId] = useState('');

  // useEffect(() => {
  //   function handleRoute() {
  //     switch (selected) {
  //       case 'popular':
  //         getMovie(setMovieList, selected);
  //         break;
  //       case 'top_rated':
  //         getMovie(setMovieList, selected);
  //         break;
  //       case 'upcoming':
  //         getMovie(setMovieList, selected);
  //         break;
  //       default:
  //         getMovieByGenre(setMovieList, genreId.toString());
  //         break;
  //     }
  //   }
  //   handleRoute();
  // }, [selected, setMovieList, genreId]);

  return (
    <>
      <Router>
        <MovieProvider>
          <Body>
            <SideBar setGenreId={setGenreId} />
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
                <Discover />
              </Route>
              <Route
                path={'/genres/:name'}
                exact
              >
                <MovieList />
              </Route>
            </Switch>
          </Body>
        </MovieProvider>
      </Router>
    </>
  );
}

export default App;
