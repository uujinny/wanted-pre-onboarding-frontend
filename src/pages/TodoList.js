import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
      : navigate('/signin');
  }, [isSuccess]);

  const [todoList, setTodoList] = useState([]);

  const [newTodo, setNewTodo] = useState('');

  const todoHandler = event => {
    setNewTodo(event.target.value);
  };

  const submitHandler = event => {
    event.preventDefault();

    postTodo({ todo: newTodo }, token)
      .then(() => setIsSuccess(true))
      .catch(err => alert(err.response.data.message));
  };

  return (
    <div>
      <form>
        <input type="text" value={newTodo} onChange={todoHandler} />
        <button type="submit" onClick={submitHandler}>
          할일 생성
        </button>
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
    </div>
  );
};

export default TodoList;
