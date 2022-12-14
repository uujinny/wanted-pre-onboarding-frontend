import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// API
import { postSignin } from '../modules/API';

const Signin = () => {
  const token = window.localStorage.getItem('token');

  const navigate = useNavigate();

  useEffect(() => {
    token && navigate('/todo');
  }, [navigate, token]);

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

  const navigateToSignup = () => {
    navigate('/Signup');
  };

  return (
    <Wrapper>
      <H1>로그인</H1>
      <Input
        type="email"
        value={email}
        onChange={emailHander}
        placeholder="아이디 (e-mail)"
      />
      <Input
        type="password"
        value={password}
        onChange={passwordHandler}
        placeholder="비밀번호 (8자이상)"
      />
      <Btn>
        <Button type="submit" onClick={submitHandler} disabled={!isValid}>
          로그인
        </Button>
        <Button type="button" onClick={navigateToSignup}>
          회원가입
        </Button>
      </Btn>
    </Wrapper>
  );
};

export default Signin;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
`;

const H1 = styled.h1``;

const Input = styled.input`
  width: 300px;
  font-size: 18px;
  padding: 10px;
  margin: 10px;
  border-radius: 15px;
  ::placeholder {
    font-size: 15px;
    color: gray;
  }
`;
const Btn = styled.div`
  margin: 20px;
`;
const Button = styled.button`
  width: 100px;
  padding: 12px;
  margin: 10px;
  font-size: 15px;
  color: white;
  font-weight: bolder;
  background-color: black;
  border: none;
  cursor: pointer;
  &:disabled {
    opacity: 0.5;
  }
`;
