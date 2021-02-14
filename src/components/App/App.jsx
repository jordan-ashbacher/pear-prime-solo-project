import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { useDispatch } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import Home from '../Home/Home'
import Search from '../Search/Search'
import Favorites from '../Favorites/Favorites'
import Pear from '../Pear/Pear'
import FriendPage from '../FriendPage/FriendPage'
import NavDrawer from '../NavDrawer/NavDrawer'

import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles"

import './App.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#677F6A"
    },
    secondary: {
      main: "#898A34"
    },
    background: {
      primary: "#677F6A"
    }
  },
  typography: {
    fontFamily: "'Nunito Sans', sans-serif",
    h1: {
      fontFamily: "'Brightfate', sans-serif",
    }
  },
  
})

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
    <Router>
      <div>
      <NavDrawer />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <UserPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/info"
          >
            <InfoPage />
          </ProtectedRoute>
          <ProtectedRoute 
            exact 
            path="/"
          >
            <Home />
          </ProtectedRoute>
          <ProtectedRoute  
            path="/home"
          >
            <Home />
          </ProtectedRoute>

          <ProtectedRoute
            exact  
            path="/search"
          >
            <Search />
          </ProtectedRoute>
          
          <ProtectedRoute
            exact  
            path="/favorites"
          >
            <Favorites />
          </ProtectedRoute>
          
          <ProtectedRoute
            exact  
            path="/pear"
          >
            <Pear />
          </ProtectedRoute>
          
          <ProtectedRoute
            exact  
            path="/friends"
          >
            <FriendPage />
          </ProtectedRoute>

          {/* When a value is supplied for the authRedirect prop the user will
            be redirected to the path supplied when logged in, otherwise they will
            be taken to the component and path supplied. */}
          <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to "/user"
            // - else shows LoginPage at /login
            exact
            path="/login"
            authRedirect="/home"
          >
            <LoginPage />
          </ProtectedRoute>

          <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to "/user"
            // - else shows RegisterPage at "/registration"
            exact
            path="/registration"
            authRedirect="/home"
          >
            <RegisterPage />
          </ProtectedRoute>

          <ProtectedRoute
            // with authRedirect:
            // - if logged in, redirects to "/user"
            // - else shows LandingPage at "/home"
            exact
            path="/home"
            authRedirect="/home"
          >
            <LandingPage />
          </ProtectedRoute>
          

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        
      </div>
    </Router>
    </ThemeProvider>
  );
}

export default App;
