import React, { useState } from 'react';

// API
import { updateTodo, deleteTodo } from '../modules/API';

const Todo = ({ id, todo, isCompleted, setIsSuccess }) => {
  const token = window.localStorage.getItem('token');

  const [task, setTask] = useState(todo);
  const [isDone, setIsDone] = useState(isCompleted);

  const todoHandler = event => {
    setTask(event.target.value);
  };

  const checkboxHandler = event => {
    setIsDone(event.target.checked);
  };

  const [editable, setEditable] = useState(false);

  const editabilityHandler = () => {
    setEditable(true);
  };

  const cancelHandler = () => {
    setEditable(false);
    setTask(todo);
  };

  const updateHandler = () => {
    updateTodo(id, { todo: task, isCompleted: isDone }, token)
      .then(() => {
        setIsSuccess(true);
        setEditable(false);
      })
      .catch(err => alert(err.response.data.message));
  };

  const deleteHandler = () => {
    deleteTodo(id, token)
      .then(() => setIsSuccess(true))
      .catch(err => alert(err.response.data.message));
  };

  return (
    <li>
      {/* 할일 내용 */}
      <input
        type="text"
        value={task}
        disabled={!editable}
        onChange={todoHandler}
      />

      {/* 완료 여부 */}
      <span>완료여부</span>
      <input
        type="checkbox"
        checked={isDone}
        disabled={!editable}
        onChange={checkboxHandler}
      />

      {/* 수정 버튼 - 수정 버튼 클릭 시 수정하기, 취소하기 버튼 활성화 */}
      {!editable && (
        <button type="button" onClick={editabilityHandler}>
          수정
        </button>
      )}

      {/* 수정 모드에서 보여지는 버튼 */}
      {editable && (
        <>
          <button type="button" onClick={updateHandler}>
            수정하기
          </button>
          <button type="button" onClick={cancelHandler}>
            취소하기
          </button>
        </>
      )}

      {/* 할일 삭제 버튼 */}
      <button type="button" onClick={deleteHandler}>
        삭제
      </button>
    </li>
  );
};

export default React.memo(Todo);
