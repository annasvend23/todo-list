import { ISetPopupActiveAction } from '../../interfaces/actions';
import { SET_POPUP_DELETE_TODO_ACTIVE, SET_POPUP_MENU_ACTIVE } from '../types';

export const initialState = {
  activeItemId: null,
  activeItemIdToDelete: null,
};

export const popupReducer = (
  state = initialState,
  { type, payload }: ISetPopupActiveAction
) => {
  switch (type) {
    case SET_POPUP_MENU_ACTIVE: {
      return {
        ...state,
        activeItemId: payload,
      };
    }

    case SET_POPUP_DELETE_TODO_ACTIVE: {
      return {
        ...state,
        activeItemIdToDelete: payload,
      };
    }

    default:
      return state;
  }
};
