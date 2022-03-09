import { generateKey } from 'crypto';
import { atom, selector } from 'recoil';

const persistedData = (key: string, initialState: any[]) => {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialState;
  } catch (error) {
    console.log(error);
    return initialState;
  }
};

export const initialCategory: ICategory = {
  category: 'default',
  color: 'gold',
  id: Date.now(),
};

export const initialFilter: ICategory = {
  category: 'all',
  color: 'gray',
  id: Date.now(),
};

export interface ICategory {
  category: string;
  color: string;
  id: number;
}

export interface ITodo {
  text: string;
  id: number;
  category: ICategory;
  status: TodoStatus;
}

export enum TodoStatus {
  'TODO' = 'TODO',
  'DELETE' = 'DELETE',
  'DONE' = 'DONE',
}

export const selectedCategory = atom<ICategory>({
  key: 'selectedCategory',
  default: initialCategory,
});

export const selectedFilter = atom<ICategory>({
  key: 'selectedFilter',
  default: initialFilter,
});

export const categoryState = atom<ICategory[]>({
  key: 'category',
  default: persistedData('JTODO.CATEGORIES', [initialCategory]),
});

export const todoState = atom<ITodo[]>({
  key: 'todo',
  default: persistedData('JTODO.TODOS', []),
});

export const filterSelector = selector({
  key: 'filterSelector',
  get: ({ get }) => {
    const categories = get(categoryState);
    return [initialFilter, ...categories];
  },
});

export const todoSelector = selector({
  key: 'todoSelector',
  get: ({ get }) => {
    const todos = get(todoState);
    const currentFilter = get(selectedFilter);

    console.log(currentFilter);

    if (currentFilter.category === 'all') {
      return todos;
    }

    return [
      ...todos.filter(
        (todo) => todo.category.category === currentFilter.category
      ),
    ];
  },
});
