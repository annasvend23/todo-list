import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { charsLimit } from '../../constants';
import { addToDoInList } from '../../redux/actions';
import { validate } from '../../validate';
import './ToDoForm.css';

const ToDoForm: FC = () => {
  const [formValue, setFormValue] = useState('');
  const [formError, setFormError] = useState('');
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setFormValue(value);
    setFormError(validate(value));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setFormError(validate(formValue));
      dispatch(addToDoInList(formValue));
      setFormValue('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const error = validate(formValue);
    setFormError(error);
    if (!error) {
      dispatch(addToDoInList(formValue));
      setFormValue('');
    }
  };

  return (
    <div className='container__todo-form'>
      <form className='todo-form' onSubmit={handleSubmit}>
        <label className='todo-form__label' htmlFor='textarea-1'>
          Введите вашу задачу
        </label>
        <textarea
          className='todo-form__textarea'
          id='textarea-1'
          value={formValue}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
        {!formError ? (
          <>
            <span className='textarea__prompt'>
              {formValue.length} / {charsLimit}
            </span>
            <button className='button todo-form__button' type='submit'>
              Добавить
            </button>
          </>
        ) : (
          <>
            <span className='textarea__prompt textarea__prompt_error'>
              {formError}
            </span>
            <button
              className='button todo-form__button button_is-locked'
              type='button'
            >
              Добавить
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default ToDoForm;
