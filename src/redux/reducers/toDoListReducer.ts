import {
  IAddTodoAction,
  IFetchToDoListStartedAction,
  IFetchToDoListSuccessAction,
  IFetchToDoListErrorAction,
  IUpdateToDoAction,
  ISetEditingIdAction,
  IDeleteToDoAction,
  ISetVisibilityFilterAction,
} from '../../interfaces/actions';
import {
  ADD_TODO_IN_LIST_SUCCESS,
  FETCH_TODO_LIST_STARTED,
  FETCH_TODO_LIST_SUCCESS,
  FETCH_TODO_LIST_ERROR,
  UPDATE_TODO_SUCCESS,
  SET_EDITING_ID,
  DELETE_TODO_SUCCESS,
  SET_VISIBILITY_FILTER,
} from '../types';
import { IToDoListReducerState } from '../../interfaces/state';
import { IToDoItem } from '../../interfaces/todo';

export const initialState: IToDoListReducerState = {
  loading: false,
  list: [],
  error: null,
  editingId: null,
  filters: {
    completed: false,
    todo: false,
    favourite: false,
  },
};

type TReducerActions =
  | IAddTodoAction
  | IFetchToDoListStartedAction
  | IFetchToDoListSuccessAction
  | IFetchToDoListErrorAction
  | IUpdateToDoAction
  | ISetEditingIdAction
  | IDeleteToDoAction
  | ISetVisibilityFilterAction;

export const toDoListReducer = (
  state = initialState,
  action: TReducerActions
) => {
  switch (action.type) {
    case FETCH_TODO_LIST_STARTED:
      return {
        ...state,
        loading: true,
      };
    case FETCH_TODO_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        list: action.payload,
      };

    case FETCH_TODO_LIST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ADD_TODO_IN_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        list: [action.payload, ...state.list],
      };

    case UPDATE_TODO_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        list: state.list.map((todo: IToDoItem) => {
          if (todo.id === action.payload.id) {
            return action.payload;
          }
          return todo;
        }),
      };

    case SET_EDITING_ID:
      return {
        ...state,
        editingId: action.payload,
      };

    case DELETE_TODO_SUCCESS:
      const index = state.list.findIndex((todo) => todo.id === action.payload);

      return {
        ...state,
        list: [...state.list.slice(0, index), ...state.list.slice(index + 1)],
      };

    case SET_VISIBILITY_FILTER:
      return {
        ...state,
        filters: {...initialState.filters, [action.payload]: !state.filters[action.payload]} 
      }

    default:
      return state;
  }
};
