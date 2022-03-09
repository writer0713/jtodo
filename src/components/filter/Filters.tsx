import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { categoryState, initialCategory, filterSelector } from '../../atoms';
import Category from '../category/Category';
import Filter from './Filter';

const Container = styled.div`
  width: 100px;
  margin-right: 30px;
  box-shadow: 1px 1px 5px gray;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  width: 100%;
  height: 5%;
  background-color: #353b48;
  color: white;

  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 85%;
`;

const Bottom = styled.div`
  width: 100%;
  height: 5%;
`;

const ClearBtn = styled.button`
  width: 100%;
  height: 100%;
  background-color: gold;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #fffb01;
  }

  &:active {
    background-color: #ffe70a;
  }
`;

function Filters() {
  const categories = useRecoilValue(filterSelector);

  return (
    <Container>
      <Header>Filter</Header>
      <Main>
        {categories.map((category) => (
          <Filter key={category.id} {...category} />
        ))}
      </Main>
    </Container>
  );
}

export default Filters;
