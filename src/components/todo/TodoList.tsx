import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { selectedFilter, todoSelector } from '../../atoms';
import CreateTodo from './CreateTodo';
import Todo from './Todo';

const Container = styled.div`
  height: 75vh;
  overflow-y: auto;
  box-shadow: 1px 1px 5px gray;
`;

const Header = styled.div`
  width: 100%;
  height: 100px;
  background-color: #353b48;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 50px;
  color: white;
`;

function TodoList() {
  const currentFilter = useRecoilValue(selectedFilter);
  const todos = useRecoilValue(todoSelector);

  console.log('currentFilter : ', currentFilter);
  console.log(todos);

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
