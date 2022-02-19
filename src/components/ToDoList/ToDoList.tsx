import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { IState } from '../../interfaces/state';
import ToDoItem from '../ToDoItem/ToDoItem';
import { IToDoItem } from '../../interfaces/todo';
import './ToDoList.css';

const ToDoList: FC = () => {
  const filters = useSelector((state: IState) => state.toDoListReducer.filters);
  const toDoList = useSelector((state: IState) => state.toDoListReducer.list);
  const toDoListDone = toDoList.filter((todo) => todo.isDone);
  const toDoListNotDone = toDoList.filter((todo) => !todo.isDone);
  const toDoListFavourite = toDoList.filter(
    (todo) => !todo.isDone && todo.isFavourite
  );
  const isToDoListShowAll =
    !filters.completed && !filters.favourite && !filters.todo;

  return (
    <ul className='todo-list' data-testid='todo-list'>
      {filters.completed &&
        toDoListDone.map((todo: IToDoItem) => (
          <ToDoItem todo={todo} key={todo.id} />
        ))}
      {filters.todo &&
        toDoListNotDone.map((todo: IToDoItem) => (
          <ToDoItem todo={todo} key={todo.id} />
        ))}
      {filters.favourite &&
        toDoListFavourite.map((todo: IToDoItem) => (
          <ToDoItem todo={todo} key={todo.id} />
        ))}
      {isToDoListShowAll &&
        toDoList.map((todo: IToDoItem) => (
          <ToDoItem todo={todo} key={todo.id} />
        ))}
    </ul>
  );
};

export default ToDoList;
