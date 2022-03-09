import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { ICategory, selectedFilter } from '../../atoms';

interface ICategoryProps {
  bgColor: string;
}

const CustomFilter = styled.div<ICategoryProps>`
  width: 80%;
  padding: 10px;
  margin-bottom: 10px;
  background-color: ${(props) => props.bgColor};
  border-radius: 10px;
  cursor: pointer;
`;

function Filter(category: ICategory) {
  const setSelectedFilter = useSetRecoilState(selectedFilter);
  const onClickFilter = () => {
    setSelectedFilter(category);
  };

  return (
    <CustomFilter onClick={onClickFilter} bgColor={category.color}>
      {category.category}
    </CustomFilter>
  );
}

export default Filter;
