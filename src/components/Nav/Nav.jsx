import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import {useSelector} from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user);

  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  if (user.id != null) {
    loginLinkData.path = '/home';
    loginLinkData.text = 'Home';
  }

  return (
    <div className="nav">
      <div>
        <Link className="navLink" to={loginLinkData.path}>
          {loginLinkData.text}
        </Link>

        {user.id && (
          <>
            <Link className="navLink" to="/favorites">
              Favorites
            </Link>
            <Link className="navLink" to="/pear">
              Pear
            </Link>
            <Link className="navLink" to="/friends">
              Friends
            </Link>
            <LogOutButton className="navLink" />
            <Link className="navLink" to="/search">
              Search
            </Link>
            <LogOutButton className="navLink" />
          </>
        )}
      </div>
    </div>
  );
}

export default Nav;
