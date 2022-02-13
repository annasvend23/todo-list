import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../../interfaces/state';
import { IToDoItem } from '../../interfaces/todo';
import {
  setEditingId,
  setPopupDeleteToDoActive,
  setPopupMenuActive,
  updateToDo,
} from '../../redux/actions';
import './ToDoSettings.css';

const ToDoSettings: React.FC = () => {
  const activeItemId = useSelector(
    (state: IState) => state.popupReducer.activeItemId
  );
  const todo = useSelector((state: IState) =>
    state.toDoListReducer.list.find(
      (todo: IToDoItem) => todo.id === activeItemId
    )
  );

  const dispatch = useDispatch();

  const handleClick = (value: Partial<IToDoItem>) => {
    if (activeItemId) {
      dispatch(updateToDo(activeItemId, value));
      dispatch(setPopupMenuActive(null));
    }
  };

  const handleEditClick = () => {
    if (activeItemId) {
      dispatch(setEditingId(activeItemId));
      dispatch(setPopupMenuActive(null));
    }
  };

  const handleDeleteClick = () => {
    dispatch(setPopupMenuActive(null));
    dispatch(setPopupDeleteToDoActive(activeItemId));
  };

  return (
    <div className='todo-settings'>
      <h3 className='todo-settings__title'>Настройки задачи</h3>
      {!todo?.isFavourite ? (
        <button
          className='button todo-settings__button'
          type='button'
          onClick={() => handleClick({ isFavourite: true })}
        >
          Добавить в избранное
        </button>
      ) : (
        <button
          className='button todo-settings__button'
          type='button'
          onClick={() => handleClick({ isFavourite: false })}
        >
          Удалить из ибранного
        </button>
      )}
      {!todo?.isDone ? (
        <button
          className='button todo-settings__button'
          type='button'
          onClick={() => handleClick({ isDone: true })}
        >
          Отметить выполненным
        </button>
      ) : (
        <button
          className='button todo-settings__button'
          type='button'
          onClick={() => handleClick({ isDone: false })}
        >
          Вернуть в работу
        </button>
      )}
      <button
        className='button todo-settings__button'
        type='button'
        onClick={handleEditClick}
      >
        Редактировать
      </button>
      <button
        className='button todo-settings__button'
        type='button'
        onClick={handleDeleteClick}
      >
        Удалить
      </button>
    </div>
  );
};

export default ToDoSettings;
