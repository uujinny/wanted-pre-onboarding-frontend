import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// components
import Todo from '../components/Todo';

// API
import { getTodos, postTodo } from '../modules/API';

const TodoList = () => {
  const token = window.localStorage.getItem('token');

  const navigate = useNavigate();

  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    setIsSuccess(false);

    token
      ? getTodos(token)
          .then(res => setTodoList(res.data))
          .catch(err => alert(err.response.data.message))
      : navigate('/');
  }, [isSuccess, navigate, token]);

  const [todoList, setTodoList] = useState([]);

  const [newTodo, setNewTodo] = useState('');

  const todoHandler = event => {
    setNewTodo(event.target.value);
  };

  const submitHandler = event => {
    event.preventDefault();
    postTodo({ todo: newTodo }, token)
      .then(() => {
        setIsSuccess(true);
        setNewTodo('');
      })
      .catch(err => alert(err.response.data.message));
  };

  return (
    <Wrapper>
      <H1>To do list</H1>
      <form>
        <Input type="text" value={newTodo} onChange={todoHandler} />
        <Button type="submit" onClick={submitHandler}>
          추가
        </Button>
      </form>

      <ul>
        {todoList.map(el => {
          const { id, todo, isCompleted } = el;
          return (
            <Todo
              key={id}
              id={id}
              todo={todo}
              isCompleted={isCompleted}
              setIsSuccess={setIsSuccess}
            />
          );
        })}
      </ul>
    </Wrapper>
  );
};

export default TodoList;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 20px;
`;

const H1 = styled.h1``;

const Input = styled.input`
  width: 200px;
  font-size: 13px;
  padding: 5px;
  margin: 10px;
`;
const Button = styled.button`
  width: 50px;
  padding: 10px;
  margin: 3px;
  font-size: 10px;
  color: white;
  background-color: black;
  border: none;
  cursor: pointer;
`;
