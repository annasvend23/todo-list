import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../../interfaces/state';
import { IToDoItem } from '../../interfaces/todo';
import { deleteToDo, setPopupDeleteToDoActive } from '../../redux/actions';
import './Popup.css';
import './PopupDeleteToDo.css';

const getDateText = (todo?: IToDoItem) => {
  if (!todo || !todo.date) {
    return 'не известно';
  }

  const date  = new Date(todo.date);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return `${day}.${
    month < 10 ? `0${month}` : month
  }.${year} в ${hours}:${minutes}:${seconds}`;
};

const PopupDeleteToDo = () => {
  const activeItemIdToDelete = useSelector(
    (state: IState) => state.popupReducer.activeItemIdToDelete
  );
  const todo = useSelector((state: IState) =>
    state.toDoListReducer.list.find((todo) => todo.id === activeItemIdToDelete)
  );
  const dispatch = useDispatch();

  const handleDeleteClick = () => {
    if (activeItemIdToDelete) dispatch(deleteToDo(activeItemIdToDelete));
    dispatch(setPopupDeleteToDoActive(null));
  };

  return (
    <div className={activeItemIdToDelete ? 'popup active' : 'popup'}>
      <div className='popup__content'>
        <img
          src='/close.svg'
          alt='close'
          className='popup__close'
          onClick={() => dispatch(setPopupDeleteToDoActive(null))}
        />
        <h2 className='popup__title'>
          Вы действительно хотите удалить задачу?
        </h2>
        <p className='popup__text'>{todo && todo.text}</p>
        <p className='popup__date'>Создана: {getDateText(todo)}</p>
        <div className='popup__buttons-container'>
          <button
            className='button_not-active popup__button'
            onClick={() => dispatch(setPopupDeleteToDoActive(null))}
          >
            Отмена
          </button>
          <button className='button popup__button' onClick={handleDeleteClick}>
            Да, удалить
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupDeleteToDo;
