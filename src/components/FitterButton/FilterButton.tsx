import { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IState, IToDoListFilters } from '../../interfaces/state';
import { setVisibilityFilter } from '../../redux/actions';
import './FilterButton.css';

type TProps = {
  text: string;
  filter: keyof IToDoListFilters;
};

const FilterButton: FC<TProps> = (props) => {
  const filters = useSelector((state: IState) => state.toDoListReducer.filters);
  const { text, filter } = props;
  const isActive = filters[filter];
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setVisibilityFilter(filter));
  };

  return (
    <>
      {!isActive ? (
        <button
          className='button_not-active filter__button'
          onClick={handleClick}
        >
          {text}
        </button>
      ) : (
        <button className='button filter__button' onClick={handleClick}>
          {text}
        </button>
      )}
    </>
  );
};

export default FilterButton;
