import React from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { categoryState, initialCategory, todoState } from '../atoms';

const CustomHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  /* width: 80%; */
  box-shadow: 1px 1px 5px gray;
  cursor: pointer;

  &:hover {
    background-color: #f5f6fa;
  }

  &:active {
    background-color: white;
  }
`;

function Header() {
  const setTodoState = useSetRecoilState(todoState);
  const setCategoryState = useSetRecoilState(categoryState);

  const handleClearAll = () => {
    setTodoState([]);
    setCategoryState([initialCategory]);
  };

  return <CustomHeader onClick={handleClearAll}>Clear All</CustomHeader>;
}

export default Header;
