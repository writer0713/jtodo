import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { categoryState, selectedCategory } from '../../atoms';
import randomColor from 'randomcolor';

interface IForm {
  category: string;
}

const CustomForm = styled.form`
  height: 80px;
  padding: 10px 30px;
  border-bottom: 2px solid #7f8fa6;

  box-shadow: 1px 1px 5px gray;
`;

const Container = styled.div`
  display: flex;
  height: 80%;
`;

const CustomInput = styled.input.attrs((props) => ({
  type: 'text',
  placeholder: 'write custom category',
  autoComplete: 'off',
}))`
  width: 100%;
  border: none;
  margin-right: 10px;
  border-bottom: 1px solid #c23616;

  &:focus {
    border-bottom: 1px solid #e84118;
  }
`;

const Button = styled.button`
  width: 50px;
  background-color: #487eb0;
  border: 0;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #40739e;
  }

  &:active {
    background-color: #487eb0;
  }
`;

const ErrorMessage = styled.span`
  display: block;
  font-size: 10px;
  color: #ff0000c3;
  padding: 3px;
`;

function CreateCategory() {
  const [categories, setCategories] = useRecoilState(categoryState);
  const { register, handleSubmit, formState, setValue, setError } =
    useForm<IForm>();
  const onValid = ({ category }: IForm) => {
    if (categories.length === 3) {
      setError('category', {
        message: 'Category는 3개까지만 추가할수 있습니다!',
      });
      return;
    }

    setCategories((oldCategories) => {
      const newCategory = { category, color: randomColor(), id: Date.now() };
      return [...oldCategories, newCategory];
    });
    setValue('category', '');
  };

  useEffect(() => {
    window.localStorage.setItem('JTODO.CATEGORIES', JSON.stringify(categories));
  }, [categories]);

  return (
    <CustomForm onSubmit={handleSubmit(onValid)}>
      <Container>
        <CustomInput
          {...register('category', {
            required: 'Category를 적어주세요!',
            maxLength: {
              value: 8,
              message: '최대 8글자까지만 적어주세요!',
            },
          })}
        />
        <Button>추가</Button>
      </Container>
      <ErrorMessage>{formState.errors?.category?.message}</ErrorMessage>
    </CustomForm>
  );
}

export default CreateCategory;
