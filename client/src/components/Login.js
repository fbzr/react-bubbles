import React, { useState } from "react";
import { login } from '../crud/auth';
import { useHistory } from "react-router-dom";

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const { push } = useHistory();
  const [user, setUser] = useState({
    username: '',
    password: ''
  });

  const handleChange = e => {
    e.persist();
    setUser(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await login(user);
      console.log(res);
      localStorage.setItem('token', res.data.payload);
      push('/bubbles');
    } catch(err) {
      console.log(err);
    }
    
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='username'>Username:</label>
      <input onChange={handleChange} name='username' id='username' type='text' />

      <label htmlFor='password'>Password:</label>
      <input onChange={handleChange} name='password' id='password' type='password' />

      <button type='submit'>Log in</button>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </form>
  );
};

export default Login;
