import { createTodoItem } from '../../tests/mocks/todo';
import {
  ADD_TODO_IN_LIST_SUCCESS,
  DELETE_TODO_SUCCESS,
  FETCH_TODO_LIST_ERROR,
  FETCH_TODO_LIST_STARTED,
  FETCH_TODO_LIST_SUCCESS,
  SET_EDITING_ID,
  SET_VISIBILITY_FILTER,
  UPDATE_TODO_SUCCESS,
} from '../types';
import { initialState, toDoListReducer } from './toDoListReducer';

describe('toDoListReducer', () => {
  const todo = createTodoItem();
  const initialList = {
    ...initialState,
    list: [todo],
  };

  describe(`when ${FETCH_TODO_LIST_STARTED} action passed`, () => {
    it(`sets loading to the state`, () => {
      const newState = toDoListReducer(initialState, {
        type: FETCH_TODO_LIST_STARTED,
      });

      expect(newState).toMatchObject({
        loading: true,
      });
    });
  });

  describe(`when ${FETCH_TODO_LIST_SUCCESS} action passed`, () => {
    it(`sets todos to the list from action payload`, () => {
      const newState = toDoListReducer(initialState, {
        type: FETCH_TODO_LIST_SUCCESS,
        payload: [todo],
      });

      expect(newState).toMatchObject({
        loading: false,
        error: null,
        list: [todo],
      });
    });
  });

  describe(`when ${FETCH_TODO_LIST_ERROR} action passed`, () => {
    it(`set error and loading to the state`, () => {
      const FETCH_ERROR = new Error();
      const newState = toDoListReducer(initialState, {
        type: FETCH_TODO_LIST_ERROR,
        payload: FETCH_ERROR,
      });

      expect(newState).toMatchObject({
        loading: false,
        error: FETCH_ERROR,
      });
    });
  });

  describe(`when ${ADD_TODO_IN_LIST_SUCCESS} action passed`, () => {
    it(`sets todo to the list from action payload`, () => {
      const newState = toDoListReducer(initialList, {
        type: ADD_TODO_IN_LIST_SUCCESS,
        payload: [todo],
      });

      expect(newState).toMatchObject({
        loading: false,
        error: null,
        list: [[todo], ...initialList.list],
      });
    });
  });

  describe(`when ${UPDATE_TODO_SUCCESS} action passed`, () => {
    it(`updates todo in the list from action payload`, () => {
      const updatedToDo = createTodoItem({ text: 'Learn JS' });
      const newState = toDoListReducer(initialList, {
        type: UPDATE_TODO_SUCCESS,
        payload: updatedToDo,
      });

      expect(newState).toMatchObject({
        loading: false,
        error: null,
        list: [updatedToDo],
      });
    });
  });

  describe(`when ${SET_EDITING_ID} action passed`, () => {
    it(`sets editingId from action payload`, () => {
      const ITEM_ID_TO_EDIT = '1';
      const newState = toDoListReducer(initialState, {
        type: SET_EDITING_ID,
        payload: ITEM_ID_TO_EDIT,
      });

      expect(newState).toMatchObject({
        editingId: ITEM_ID_TO_EDIT,
      });
    });
  });

  describe(`when ${DELETE_TODO_SUCCESS} action passed`, () => {
    it(`delete todo from the state`, () => {
      const id = todo.id;
      const newState = toDoListReducer(initialList, {
        type: DELETE_TODO_SUCCESS,
        payload: id,
      });

      expect(newState).toMatchObject({
        list: [],
      });
    });
  });

  describe(`when ${SET_VISIBILITY_FILTER} action passed`, () => {
    it(`sets visibility filter from the state`, () => {
      const filter = 'completed';
      const newState = toDoListReducer(initialState, {
        type: SET_VISIBILITY_FILTER,
        payload: filter,
      });

      expect(newState).toMatchObject({
        filters: {
          completed: true,
        },
      });
    });
  });
});
