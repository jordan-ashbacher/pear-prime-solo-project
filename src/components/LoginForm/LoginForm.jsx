import React, { useState } from 'react';
import './LoginForm.css'
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import InputBase from '@material-ui/core/InputBase'

const useStyles = makeStyles({
  button: {
    color: "#fafafa",
    background: "#677f6A",
    marginTop: "10px"
  },
  input: {
    color: "#677F6A",
    width: "100%",
    height: "50px",
    padding: "5px",
    border: "2px solid #677F6A",
    marginBottom: "10px"
  }
})

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();
  const classes = useStyles()

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <form className="formPanel" onSubmit={login}>
      <h2 className="loginTitle">Login</h2>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}
      <div>

          <InputBase
            type="text"
            name="username"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Username"
            className={classes.input}
          />

      </div>
      <div>

          <InputBase
            type="password"
            name="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            className={classes.input}
          />

      </div>
      <div>
        <Button className={classes.button} type="submit" name="submit" value="Log In" variant="contained" >
          Log In
        </Button>
      </div>
    </form>
  );
}

export default LoginForm;
