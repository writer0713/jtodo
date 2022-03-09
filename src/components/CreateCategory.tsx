import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { categoryState, selectedCategory } from '../atoms';
import randomColor from 'randomcolor';

interface IForm {
  category: string;
}

const CustomForm = styled.form`
  width: 700px;
  height: 80px;
  padding: 10px 30px;
  border-bottom: 2px solid #55b5cc;

  box-shadow: 1px 1px 5px gray;
  margin-top: 30px;
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
  border-bottom: 1px solid #55b5cc;

  &:focus {
    border-bottom: 1px solid #1fc3ec;
  }
`;

const Button = styled.button`
  width: 50px;
  background-color: #e2237c;
  border: 0;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #ee4594;
  }

  &:active {
    background-color: #fa77b4;
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
  const { register, handleSubmit, formState, setValue } = useForm<IForm>();
  const onValid = ({ category }: IForm) => {
    setCategories((oldCategories) => {
      const newCategory = { category, color: randomColor(), id: Date.now() };
      return [newCategory, ...oldCategories];
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
