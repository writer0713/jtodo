import React from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { ITodo, todoState, TodoStatus } from '../../atoms';

interface DoneBtnProps {
  status?: TodoStatus;
}

interface LabelProps {
  bgColor: string;
}

const TodoContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 60px;
  padding: 0 30px;
  border-bottom: 1px solid #55b5cc;
  cursor: pointer;

  &:hover {
    background-color: #c3edf8;

    .deleteBtn {
      visibility: visible;
    }
  }
`;

const TodoTitle = styled.h1`
  display: flex;
  align-items: center;

  height: 100%;
  width: 100%;
`;

const DeleteBtn = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 50px;
  height: 100%;

  color: red;
  visibility: hidden;
`;

const DoneBtn = styled.span<DoneBtnProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 50px;
  height: 100%;
  color: #0fb886;
  visibility: ${(props) =>
    props.status === TodoStatus.DONE ? 'visible' : 'hidden'};
`;

const Label = styled.div<LabelProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 5px;
  background-color: ${(props) => props.bgColor};
`;

function Todo({ text, id, status, category }: ITodo) {
  const [todos, setTodos] = useRecoilState(todoState);
  const targetIndex = todos.findIndex((todo) => todo.id === id);

  const handleToggle = () => {
    const newStatus =
      status === TodoStatus.TODO ? TodoStatus.DONE : TodoStatus.TODO;
    const newTodo = { text, id, category, status: newStatus };

    setTodos((oldTodos) => {
      return [
        ...oldTodos.slice(0, targetIndex),
        newTodo,
        ...oldTodos.slice(targetIndex + 1),
      ];
    });
  };

  const handleDelete = () => {
    setTodos((oldTodos) => {
      return [
        ...oldTodos.slice(0, targetIndex),
        ...oldTodos.slice(targetIndex + 1),
      ];
    });
  };

  return (
    <TodoContainer>
      <DeleteBtn className="deleteBtn" onClick={handleDelete}>
        ×
      </DeleteBtn>
      <TodoTitle onClick={handleToggle}>
        {status === TodoStatus.TODO ? (
          text
        ) : (
          <del style={{ color: 'lightgray' }}>{text}</del>
        )}
      </TodoTitle>
      <DoneBtn className="doneBtn" status={status}>
        ✓
      </DoneBtn>
      <Label bgColor={category.color}>{category.category.charAt(0)}</Label>
    </TodoContainer>
  );
}

export default Todo;
