import { rest } from 'msw';
import { setupServer } from 'msw/node';
import userEvent from '@testing-library/user-event';
import { createTodoItem } from '../../tests/mocks/todo';
import { render, screen } from '../../tests/test-utils';
import { initialState } from '../../redux/reducers/toDoListReducer';
import ToDoItem from './ToDoItem';

const toDoItem = createTodoItem();

const createState = (editingId: string | null = null) => ({
  preloadedState: {
    toDoListReducer: {
      ...initialState,
      editingId,
    },
  },
});

export const handlers = [
  rest.patch('http://localhost:3000/todos/1', (req, res, ctx) => {
    return res(ctx.json(createTodoItem()), ctx.delay(150))
  })
]

const server = setupServer(...handlers)

// Enable API mocking before tests.
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())

describe('ToDoItem', () => {
  describe('if todo item exist', () => {
    it('renders item', () => {
      render(<ToDoItem todo={toDoItem} />);

      expect(screen.getByText(toDoItem.text)).toBeInTheDocument();
      expect(screen.queryByTestId('textarea')).not.toBeInTheDocument();
    });
  });

  describe('when todo is done', () => {
    it('renders done icon', () => {
      const doneToDoItem = createTodoItem({ isDone: true });
      render(<ToDoItem todo={doneToDoItem} />);

      expect(screen.getByAltText('Выполнено')).toBeInTheDocument();
    });
  });

  describe('when todo is favourite', () => {
    it('renders favourite icon', () => {
      const favouriteToDoItem = createTodoItem({ isFavourite: true });
      render(<ToDoItem todo={favouriteToDoItem} />);

      expect(screen.getByAltText('В избранном')).toBeInTheDocument();
    });
  });

  describe('when state.editingId === todo.id', () => {
    it('renders edit form', () => {
      const id = '1';
      const editingToDo = createTodoItem({ id });
      render(<ToDoItem todo={editingToDo} />, createState(id));
      expect(screen.getByTestId('textarea')).toBeInTheDocument();
    });
  });

  describe('edit mode', () => {
    describe('when todo has text', () => {
      it('sets todo.text to textarea value', () => {
        const id = '1';
        const editingToDo = createTodoItem({ id });
        render(<ToDoItem todo={editingToDo} />, createState(id));
        expect(screen.getByTestId<HTMLTextAreaElement>('textarea').value).toBe(editingToDo.text);
      });
    });

    describe('when enter pressed', () => {
      it('updates todo and resets state.editingId', async () => {
        const id = '1';
        const editingToDo = createTodoItem({ id });
        render(<ToDoItem todo={editingToDo} />, createState(id));
        const domNode = screen.getByTestId<HTMLTextAreaElement>('textarea');
        userEvent.type(screen.getByTestId('textarea'), '{enter}');
        expect(await screen.queryByTestId('text')).toBeInTheDocument();
      });
    });
  });
});
