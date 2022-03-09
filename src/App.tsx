import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import CategoryList from './components/category/CategoryList';
import CreateCategory from './components/category/CreateCategory';
import TodoList from './components/todo/TodoList';
import ClearButton from './components/ClearButton';
import Filters from './components/filter/Filters';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
  ${reset}
  * {
    box-sizing: border-box;
  }

  body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100vw;
    height: 100vh;

    font-family: 'Source Sans Pro', sans-serif;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  input, input:focus {
    outline: none;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 1300px;
`;

const Main = styled.div`
  width: 1000px;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

function App() {
  return (
    <Container>
      <GlobalStyle />
      <CategoryList />
      <Main>
        <TodoList />
        <CreateCategory />
        <ClearButton />
      </Main>
      <Filters />
    </Container>
  );
}

export default App;
