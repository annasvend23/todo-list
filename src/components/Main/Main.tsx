import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../../interfaces/state';
import { fetchToDoList } from '../../redux/actions';
import Filters from '../Filters/Filters';
import ToDoForm from '../ToDoForm/ToDoForm';
import ToDoList from '../ToDoList/ToDoList';
import './Main.css';

const Main: React.FC = () => {
  const todos = useSelector((state: IState) => state.toDoListReducer.list);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchToDoList());
  }, [dispatch]);

  return (
    <main className='main'>
      <ToDoForm />
      {todos.length === 0 ? (
        <p className='main__message'>Пока нет дел :-(</p>
      ) : (
        <>
          <Filters />
          <ToDoList />
        </>
      )}
    </main>
  );
};

export default Main;
