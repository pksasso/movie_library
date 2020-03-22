import React from 'react';
import styled from 'styled-components';
import {
  HashRouter as Router,
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
  flex-direction: row;
  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const Side = styled.div`
  @media (max-width: 900px) {
    display:none;
  }
`;

const AppBar = styled.div`
  height: 50px;
  background-color: #171e22;
  width:100%;
  display:none;
  box-shadow: 0px 0px 23px -8px rgba(0,0,0,0.75);
  @media (max-width: 900px) {
    display: flex;
    position: fixed;
  }
  @media (max-width: 768px) {
    margin-bottom: 25px;
  }
`;

function App() {
  return (
    <>
      <Router>
        <MovieProvider>
          <Body>
            <AppBar />
            <Side>
              <SideBar />
            </Side>
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
