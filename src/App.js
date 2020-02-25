import React from 'react';
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import { MovieProvider } from './contexts/MovieContext';
import SideBar from './components/SideBar';

import Discover from './containers/Discover';
import Genre from './containers/Genre';
import Movie from './containers/Movie';


const Body = styled.div`
  display: flex;
  flex-direction:row;
`;

function App() {
  return (
    <>
      <Router>
        <MovieProvider>
          <Body>
            <SideBar />
            <Switch>
              <Route
                path="/"
                exact
                render={() => (<Redirect from={'/'} to={'/discover/popular'} />)}
              />
              <Route
                path={'/discover/:name'}
                exact
                component={Discover}
              />
              <Route
                path={'/genres/:name'}
                exact
                component={Genre}
              />
              <Route
                path={'/movie/:id'}
                exact
                component={Movie}
              />
            </Switch>
          </Body>
        </MovieProvider>
      </Router>
    </>
  );
}

export default App;
