import { SET_POPUP_MENU_ACTIVE, SET_POPUP_DELETE_TODO_ACTIVE } from '../types';
import { popupReducer, initialState } from './popupReducer';

describe('popupReducer', () => {
  describe(`when ${SET_POPUP_MENU_ACTIVE} action passed`, () => {
    it('sets activeItemId from action payload', () => {
      const ACTIVE_ITEM_ID = '1';
      const newState = popupReducer(initialState, {
        type: SET_POPUP_MENU_ACTIVE,
        payload: ACTIVE_ITEM_ID,
      });

      expect(newState).toMatchObject({
        activeItemId: ACTIVE_ITEM_ID,
      });
    });
  });

  describe(`when ${SET_POPUP_DELETE_TODO_ACTIVE} action passed`, () => {
    it('sets activeItemIdToDelete from action payload', () => {
      const ACTIVE_ITEM_ID_TO_DELETE = '1';
      const newState = popupReducer(initialState, {
        type: SET_POPUP_DELETE_TODO_ACTIVE,
        payload: ACTIVE_ITEM_ID_TO_DELETE,
      });

      expect(newState).toMatchObject({
        activeItemIdToDelete: ACTIVE_ITEM_ID_TO_DELETE,
      });
    });
  });
});
