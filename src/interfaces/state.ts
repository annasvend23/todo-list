import { IToDoItem } from './todo';

export interface IToDoListReducerState {
  loading: boolean;
  list: IToDoItem[];
  error: Error | null;
  editingId: string | null;
  filters: IToDoListFilters;
}

export interface IToDoListFilters {
  completed: boolean;
  todo: boolean;
  favourite: boolean;
}

export interface IPopupReducerState {
  activeItemId: null | string;
  activeItemIdToDelete: null | string;
}

export interface IState {
  toDoListReducer: IToDoListReducerState;
  popupReducer: IPopupReducerState;
}
