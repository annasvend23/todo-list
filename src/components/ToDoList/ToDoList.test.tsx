import { createTodoItem } from '../../tests/mocks/todo';
import { render, screen, getByTestId } from '../../tests/test-utils';
import { initialState } from '../../redux/reducers/toDoListReducer';
import ToDoList from './ToDoList';
import { IToDoListFilters } from '../../interfaces/state';

const completedToDoItem = createTodoItem({ id: '1', isDone: true, text: 'completed' });
const notCompletedToDoItem = createTodoItem({
  id: '2',
  isDone: false,
  text: 'not-completed',
});
const favouriteToDoItem = createTodoItem({
  id: '3',
  isFavourite: true,
  text: 'favourite',
});
const notFavouriteToDoItem = createTodoItem({
  id: '4',
  isFavourite: false,
  text: 'not-favourite',
});

const createState = (filters: Partial<IToDoListFilters> = {}) => ({
  preloadedState: {
    toDoListReducer: {
      ...initialState,
      filters: {
        ...initialState.filters,
        ...filters,
      },
      list: [
        completedToDoItem,
        notCompletedToDoItem,
        favouriteToDoItem,
        notFavouriteToDoItem,
      ],
    },
  },
});

describe('ToDoList', () => {
  describe('if no filters selected', () => {
    it('renders full list', () => {
      render(<ToDoList />, createState());

      expect(screen.getByTestId('todo-list')).toBeInTheDocument();
      expect(screen.getByText(completedToDoItem.text)).toBeInTheDocument();
      expect(screen.getByText(notCompletedToDoItem.text)).toBeInTheDocument();
      expect(screen.getByText(favouriteToDoItem.text)).toBeInTheDocument();
      expect(screen.getByText(notFavouriteToDoItem.text)).toBeInTheDocument();
    });
  });

  describe('if `completed` filter selected', () => {
    it('does NOT renders not completed item', () => {
      render(<ToDoList />, createState({ completed: true }));

      expect(screen.queryByText(notCompletedToDoItem.text)).not.toBeInTheDocument();
    });
  });

  describe('if `todo` filter selected', () => {
    it('does NOT renders completed item', () => {
      render(<ToDoList />, createState({ todo: true }));

      expect(screen.queryByText(completedToDoItem.text)).not.toBeInTheDocument();
    });
  });

  describe('if `favourite` filter selected', () => {
    it('does NOT renders completed and not favourite item', () => {
      render(<ToDoList />, createState({ favourite: true }));

      expect(screen.queryByText(completedToDoItem.text)).not.toBeInTheDocument();
      expect(screen.queryByText(notFavouriteToDoItem.text)).not.toBeInTheDocument();
    });
  });
});
