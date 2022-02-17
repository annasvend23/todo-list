import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../../interfaces/state';
import { IToDoItem } from '../../interfaces/todo';
import {
  setPopupMenuActive,
  updateToDo,
  setEditingId,
} from '../../redux/actions';
import { validate } from '../../validate';
import { charsLimit } from '../../constants';
import './ToDoItem.css';

type TProps = {
  todo: IToDoItem;
};

const ToDoItem: FC<TProps> = (props) => {
  const editingId = useSelector(
    (state: IState) => state.toDoListReducer.editingId
  );
  const dispatch = useDispatch();
  const { todo } = props;
  const isEdit = editingId === todo.id;
  const [formValue, setFormValue] = useState<string>(todo.text);
  const [formError, setFormError] = useState('');

  const handleMenuClick = () => {
    dispatch(setPopupMenuActive(todo.id));
  };

  const handleIsFavouriteClick = (value: Partial<IToDoItem>) => {
    dispatch(updateToDo(todo.id, value));
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setFormError(validate(value));
    setFormValue(value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setFormError(validate(formValue));
      if (!formError) {
        dispatch(updateToDo(todo.id, { text: formValue }));
        dispatch(setEditingId(null));
      }
    }
  };

  return (
    <li className='todo-item'>
      <div className='todo-item__left'>
        {todo.isDone && (
          <img className='todo-item__is-done' src='/done.svg' alt='Выполнено' />
        )}
        {todo.isFavourite && (
          <img
            className='todo-item__is-favourite'
            src='/star.svg'
            alt='В избранном'
            onClick={() => handleIsFavouriteClick({ isFavourite: false })}
          />
        )}
        {!isEdit ? (
          <p className='todo-item__text'>{todo.text}</p>
        ) : (
          <form className='todo-item__form'>
            <textarea
              className='todo-item__textarea'
              value={formValue}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              autoFocus
            >
              {todo.text}
            </textarea>
            {!formError ? (
              <span className='textarea__prompt textarea__prompt_in-todo-item'>
                {formValue.length} / {charsLimit}
              </span>
            ) : (
              <span className='textarea__prompt textarea__prompt_in-todo-item textarea__prompt_error'>
                {formError}
              </span>
            )}
          </form>
        )}
      </div>

      <img
        className='todo-item__menu'
        src='/menu.svg'
        alt='Открыть меню'
        onClick={handleMenuClick}
      />
    </li>
  );
};

export default ToDoItem;
