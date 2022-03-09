import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { todoState } from '../atoms';
import CreateTodo from './CreateTodo';
import Todo from './Todo';

const Container = styled.div`
  width: 700px;
  height: 80vh;
  overflow-y: auto;
  box-shadow: 1px 1px 5px gray;

  margin: 0 auto;
`;

const Header = styled.div`
  width: 100%;
  height: 100px;
  background-color: #55b5cc;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 50px;
  color: white;
`;

function TodoList() {
  const todos = useRecoilValue(todoState);
  return (
    <Container>
      <Header>
        <Title>JTodo</Title>
      </Header>
      <CreateTodo />

      {todos.map((todo) => (
        <Todo key={todo.id} {...todo} />
      ))}
    </Container>
  );
}

export default TodoList;
