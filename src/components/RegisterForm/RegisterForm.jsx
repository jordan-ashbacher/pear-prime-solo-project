import React, { useState } from 'react';
import './RegisterForm.css'
import { useDispatch, useSelector } from 'react-redux';
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

function RegisterForm() {
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    current_location: ''
  });
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const classes = useStyles()

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: newUser,
    });
  }; // end registerUser

  const handleChange = (e) => {
    e.preventDefault()
    const value = e.target.value
    setNewUser({...newUser, [e.target.name]: value})
  }

  return (
    <form className="formPanel" onSubmit={registerUser}>
      <h2 className="registerTitle">Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div>
        
          <InputBase
            type="text"
            name="firstName"
            value={newUser.firstName}
            required
            onChange={handleChange}
            placeholder="First Name"
            className={classes.input}
          />
        
      </div>
      <div>
        
          <InputBase
            type="text"
            name="lastName"
            value={newUser.lastName}
            required
            onChange={handleChange}
            placeholder="Last Name"
            className={classes.input}
          />
    
      </div>
      <div>
 
          <InputBase
            type="text"
            name="username"
            value={newUser.username}
            required
            onChange={handleChange}
            placeholder="Username"
            className={classes.input}
          />

      </div>
      <div>

          <InputBase
            type="password"
            name="password"
            value={newUser.password}
            required
            onChange={handleChange}
            placeholder="Password"
            className={classes.input}
          />

      </div>
      <div>

          <InputBase
            type="text"
            name="current_location"
            value={newUser.current_location}
            required
            onChange={handleChange}
            placeholder="City"
            className={classes.input}
          />

      </div>
      <div>
      <Button className={classes.button} type="submit" name="submit" value="Register" variant="contained" >
          Register
        </Button>
      </div>
    </form>
  );
}

export default RegisterForm;