import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// API
import { postSignin } from '../modules/API';

const Signin = () => {
  const token = window.localStorage.getItem('token');

  const navigate = useNavigate();

  useEffect(() => {
    token && navigate('/todo');
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailHander = event => {
    const emailInput = event.target.value;
    setEmail(emailInput);
  };

  const passwordHandler = event => {
    const passwordInput = event.target.value;
    setPassword(passwordInput);
  };

  const isValid = email.includes('@') && password.length >= 8;

  const submitHandler = event => {
    event.preventDefault();

    postSignin({ email, password })
      .then(res => {
        window.localStorage.setItem('token', res.data.access_token);
        navigate('/todo');
      })
      .catch(err => alert(err.response.data.message));
  };

  return (
    <form>
      <input type="email" value={email} onChange={emailHander} />
      <input type="password" value={password} onChange={passwordHandler} />
      <button type="submit" onClick={submitHandler} disabled={!isValid}>
        로그인하기
      </button>
    </form>
  );
};

export default Signin;
