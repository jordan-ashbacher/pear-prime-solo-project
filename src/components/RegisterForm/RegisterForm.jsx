import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function RegisterForm() {
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    city: ''
  });
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

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
      <h2>Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div>
        <label htmlFor="firstName">
          First Name:
          <input
            type="text"
            name="firstName"
            value={newUser.firstName}
            required
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label htmlFor="lastName">
          Last Name:
          <input
            type="text"
            name="lastName"
            value={newUser.lastName}
            required
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label htmlFor="username">
          Username:
          <input
            type="text"
            name="username"
            value={newUser.username}
            required
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            value={newUser.password}
            required
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label htmlFor="city">
          City:
          <input
            type="text"
            name="city"
            value={newUser.city}
            required
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <input className="btn" type="submit" name="submit" value="Register" />
      </div>
    </form>
  );
}

export default RegisterForm;