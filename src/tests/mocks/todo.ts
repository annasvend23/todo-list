import { IToDoItem } from '../../interfaces/todo';

export const createTodoItem = (
  override: Partial<IToDoItem> = {}
): IToDoItem => ({
  id: 'TODO_ITEM_ID',
  isDone: false,
  isFavourite: false,
  text: 'Cook Dinner',
  date: new Date('2022-02-13T19:29:16.583Z'),
  ...override,
});
