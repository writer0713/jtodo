import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import {
  initialCategory,
  selectedCategory,
  todoState,
  TodoStatus,
} from '../../atoms';

const CustomForm = styled.form`
  width: 100%;
  height: 80px;
  padding: 10px 30px;
  border-bottom: 2px solid #55b5cc;
`;

const Container = styled.div`
  display: flex;
  height: 80%;
`;

const CustomInput = styled.input.attrs((props) => ({
  type: 'text',
  placeholder: 'write your todo...',
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

const Button = styled.button<ButtonProps>`
  width: 50px;
  background-color: ${(props) => props.chosenColor};
  border: 0;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.chosenColor === '' ? '' : '#487eb0')};
  }

  &:active {
    background-color: #40739e;
  }
`;

const ErrorMessage = styled.span`
  display: block;
  font-size: 10px;
  color: #ff0000c3;
  padding: 3px;
`;

interface IForm {
  todo: string;
}

interface ButtonProps {
  chosenColor?: string;
}

function CreateTodo() {
  const [chosenCategory, setChosenCategory] = useRecoilState(selectedCategory);
  const [todos, setTodos] = useRecoilState(todoState);
  const { register, handleSubmit, formState, setValue } = useForm<IForm>();
  const onValid = ({ todo }: IForm) => {
    setTodos((oldTodos) => [
      {
        text: todo,
        id: Date.now(),
        status: TodoStatus.TODO,
        category: chosenCategory,
      },
      ...oldTodos,
    ]);
    setValue('todo', '');
    setChosenCategory(initialCategory);
  };

  useEffect(() => {
    window.localStorage.setItem('JTODO.TODOS', JSON.stringify(todos));
  }, [todos]);

  return (
    <CustomForm onSubmit={handleSubmit(onValid)}>
      <Container>
        <CustomInput
          {...register('todo', {
            required: 'Todo를 적어주세요!',
            minLength: {
              value: 3,
              message: '최소 세글자를 적어주세요!',
            },
            maxLength: {
              value: 50,
              message: '최대 50글자까지만 적어주세요!',
            },
          })}
        />
        <Button
          disabled={chosenCategory.color === ''}
          chosenColor={chosenCategory.color}
        >
          추가
        </Button>
      </Container>
      <ErrorMessage>{formState.errors?.todo?.message}</ErrorMessage>
    </CustomForm>
  );
}

export default CreateTodo;
