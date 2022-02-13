import { combineReducers } from 'redux';
import { toDoListReducer } from './toDoListReducer';
import { popupReducer } from './popupReducer';

export const rootReducer = combineReducers({ toDoListReducer, popupReducer });
