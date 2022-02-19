import {
  ADD_TODO_IN_LIST_SUCCESS,
  FETCH_TODO_LIST_ERROR,
  FETCH_TODO_LIST_STARTED,
  FETCH_TODO_LIST_SUCCESS,
  SET_EDITING_ID,
  SET_POPUP_MENU_ACTIVE,
  SET_POPUP_DELETE_TODO_ACTIVE,
  UPDATE_TODO_SUCCESS,
  DELETE_TODO_SUCCESS,
  SET_VISIBILITY_FILTER,
} from '../redux/types';
import { IToDoListFilters } from './state';
import { IToDoItem } from './todo';

export interface IAddTodoAction {
  type: typeof ADD_TODO_IN_LIST_SUCCESS;
  payload: IToDoItem[];
}

export interface IFetchToDoListStartedAction {
  type: typeof FETCH_TODO_LIST_STARTED;
}

export interface IFetchToDoListSuccessAction {
  type: typeof FETCH_TODO_LIST_SUCCESS;
  payload: IToDoItem[];
}

export interface IFetchToDoListErrorAction {
  type: typeof FETCH_TODO_LIST_ERROR;
  payload: Error;
}

export interface ISetPopupActiveAction {
  type: typeof SET_POPUP_MENU_ACTIVE | typeof SET_POPUP_DELETE_TODO_ACTIVE;
  payload: string | null;
}

export interface IUpdateToDoAction {
  type: typeof UPDATE_TODO_SUCCESS;
  payload: IToDoItem;
}

export interface ISetEditingIdAction {
  type: typeof SET_EDITING_ID;
  payload: string | null;
}

export interface IDeleteToDoAction {
  type: typeof DELETE_TODO_SUCCESS;
  payload: {};
}

export interface ISetVisibilityFilterAction {
  type: typeof SET_VISIBILITY_FILTER;
  payload: keyof IToDoListFilters;
}
