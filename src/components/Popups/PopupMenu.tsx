import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../../interfaces/state';
import { setPopupMenuActive } from '../../redux/actions';
import ToDoSettings from '../ToDoSettings/ToDoSettings';
import './Popup.css';

const PopupMenu = () => {
  const isActive = useSelector(
    (state: IState) => state.popupReducer.activeItemId
  );
  const dispatch = useDispatch();

  return (
    <div
      className={isActive ? 'popup active' : 'popup'}
      onClick={() => dispatch(setPopupMenuActive(null))}
    >
      <div className='popup__content' onClick={(e) => e.stopPropagation()}>
        <ToDoSettings />
      </div>
    </div>
  );
};

export default PopupMenu;
