import React from 'react';

const ToDoForm: React.FC = () => {
  return (
    <form className='todo-form'>
      <label htmlFor='textarea-1'>Введите название дела</label>
      <textarea id='textarea-1' className='todo-form__textarea'></textarea>
      <button
        className='button todo-form__button'
        type='submit'
      >
        Submit
      </button>
    </form>
  );
};

export default ToDoForm;
