import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import CategoryList from './components/CategoryList';
import CreateCategory from './components/CreateCategory';
import TodoList from './components/TodoList';

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
`;

function App() {
  return (
    <Container>
      <GlobalStyle />
      <CategoryList />
      <div>
        <TodoList />
        <CreateCategory />
      </div>
    </Container>
  );
}

export default App;
