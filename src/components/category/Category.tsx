import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { ICategory, selectedCategory } from '../../atoms';

interface ICategoryProps {
  bgColor: string;
}

const CustomCategory = styled.div<ICategoryProps>`
  width: 80%;
  padding: 10px;
  margin-bottom: 10px;
  background-color: ${(props) => props.bgColor};
  border-radius: 10px;
  cursor: pointer;
`;

function Category(category: ICategory) {
  const setSelectedCategory = useSetRecoilState(selectedCategory);
  const onClickCategory = () => {
    setSelectedCategory(category);
  };

  return (
    <CustomCategory onClick={onClickCategory} bgColor={category.color}>
      {category.category}
    </CustomCategory>
  );
}

export default Category;
