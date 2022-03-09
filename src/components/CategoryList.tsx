import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { categoryState } from '../atoms';
import Category from './Category';

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
  height: 30px;
  background-color: #55b5cc;
  color: white;

  display: flex;
  justify-content: center;
  align-items: center;

  margin-bottom: 30px;
`;

const Title = styled.h1`
  font-size: 50px;
  color: white;
`;

function CategoryList() {
  const categories = useRecoilValue(categoryState);
  return (
    <Container>
      <Header>Categories</Header>
      {categories.map((category) => (
        <Category key={category.id} {...category} />
      ))}
    </Container>
  );
}

export default CategoryList;
