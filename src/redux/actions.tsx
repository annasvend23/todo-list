import {
  ADD_TODO_IN_LIST_STARTED,
  ADD_TODO_IN_LIST_SUCCESS,
  ADD_TODO_IN_LIST_ERROR,
  FETCH_TODO_LIST_STARTED,
  FETCH_TODO_LIST_SUCCESS,
  FETCH_TODO_LIST_ERROR,
  SET_POPUP_MENU_ACTIVE,
  UPDATE_TODO_STARTED,
  UPDATE_TODO_SUCCESS,
  UPDATE_TODO_ERROR,
  SET_EDITING_ID,
  SET_POPUP_DELETE_TODO_ACTIVE,
  DELETE_TODO_STARTED,
  DELETE_TODO_SUCCESS,
  DELETE_TODO_ERROR,
  SET_VISIBILITY_FILTER,
} from './types';
import { IToDoItem } from '../interfaces/todo';
import { Dispatch } from 'redux';
import { IToDoListFilters } from '../interfaces/state';

export const setPopupMenuActive = (activeItemId: string | null) => ({
  type: SET_POPUP_MENU_ACTIVE,
  payload: activeItemId,
});

export const setPopupDeleteToDoActive = (activeItemId: string | null) => ({
  type: SET_POPUP_DELETE_TODO_ACTIVE,
  payload: activeItemId,
});

export const setEditingId = (editingId: string | null) => ({
  type: SET_EDITING_ID,
  payload: editingId,
});

export const setVisibilityFilter = (filter: keyof IToDoListFilters) => ({
  type: SET_VISIBILITY_FILTER,
  payload: filter,
})

export const addToDoInListStarted = () => ({
  type: ADD_TODO_IN_LIST_STARTED,
});

export const addToDoInListSuccess = (response: IToDoItem[]) => ({
  type: ADD_TODO_IN_LIST_SUCCESS,
  payload: response,
});

export const addToDoInListError = (error: Error) => ({
  type: ADD_TODO_IN_LIST_ERROR,
  payload: error,
});

export const addToDoInList = (todo: string) => {
  return (dispatch: Dispatch) => {
    dispatch(addToDoInListStarted());

    fetch(`http://localhost:3000/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      body: JSON.stringify({
        isDone: false,
        isFavourite: false,
        text: todo,
        date: new Date(),
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        dispatch(addToDoInListSuccess(json));
      })
      .catch((error) => {
        dispatch(addToDoInListError(error));
      });
  };
};

export const fetchToDoListStarted = () => ({
  type: FETCH_TODO_LIST_STARTED,
});

export const fetchToDoListSuccess = (response: IToDoItem[]) => ({
  type: FETCH_TODO_LIST_SUCCESS,
  payload: response,
});

export const fetchToDoListError = (error: Error) => ({
  type: FETCH_TODO_LIST_ERROR,
  payload: error,
});

export const fetchToDoList = () => {
  return (dispatch: Dispatch) => {
    dispatch(fetchToDoListStarted());

    fetch('http://localhost:3000/todos')
      .then((res) => res.json())
      .then((json) => {
        dispatch(fetchToDoListSuccess(json));
      })
      .catch((error) => dispatch(fetchToDoListError(error)));
  };
};

export const updateToDoStarted = () => ({
  type: UPDATE_TODO_STARTED,
});

export const updateToDoSuccess = (response: IToDoItem[]) => ({
  type: UPDATE_TODO_SUCCESS,
  payload: response,
});

export const updateToDoError = (error: Error) => ({
  type: UPDATE_TODO_ERROR,
  payload: error,
});

export const updateToDo = (id: string, value: Partial<IToDoItem>) => {
  return (dispatch: Dispatch) => {
    dispatch(updateToDoStarted());

    fetch(`http://localhost:3000/todos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(value),
    })
      .then((res) => res.json())
      .then((json) => {
        dispatch(updateToDoSuccess(json));
      })
      .catch((error) => dispatch(updateToDoError(error)));
  };
};

export const deleteToDoStarted = () => ({
  type: DELETE_TODO_STARTED,
});

export const deleteToDoSuccess = (response: string) => ({
  type: DELETE_TODO_SUCCESS,
  payload: response,
});

export const deleteToDoError = (error: Error) => ({
  type: DELETE_TODO_ERROR,
  payload: error,
});

export const deleteToDo = (id: string) => {
  return (dispatch: Dispatch) => {
    dispatch(deleteToDoStarted());

    fetch(`http://localhost:3000/todos/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((json) => {
        dispatch(deleteToDoSuccess(id));
      })
      .catch((error) => dispatch(deleteToDoError(error)));
  };
};
