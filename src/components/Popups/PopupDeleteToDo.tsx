import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../../interfaces/state';
import { deleteToDo, setPopupDeleteToDoActive } from '../../redux/actions';
import './Popup.css';
import './PopupDeleteToDo.css';

const PopupDeleteToDo = () => {
  const activeItemIdToDelete = useSelector(
    (state: IState) => state.popupReducer.activeItemIdToDelete
  );
  const todo = useSelector((state: IState) =>
    state.toDoListReducer.list.find((todo) => todo.id === activeItemIdToDelete)
  );
  const dispatch = useDispatch();
  const date = todo && new Date(todo!.date);
  const day = date && date.getDate();
  const month = date && date.getMonth() + 1;
  const year = date && date.getFullYear();
  const hours = date && date.getHours();
  const minutes = date && date.getMinutes();
  const seconds = date && date.getSeconds();

  const handleDeleteClick = () => {
    if (activeItemIdToDelete) dispatch(deleteToDo(activeItemIdToDelete));
    dispatch(setPopupDeleteToDoActive(null))
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
        <p className='popup__date'>
          Создана:{' '}
          {todo && month
            ? `${day}.${
                month < 10 ? `0${month}` : month
              }.${year} в ${hours}:${minutes}:${seconds}`
            : 'не известно'}{' '}
        </p>
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
