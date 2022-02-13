import FilterButton from '../FitterButton/FilterButton';
import './Filters.css';

const Filters: React.FC = () => {
  return (
    <div className='filters'>
      <h3 className='filters__title'>Фильтры по задачам:</h3>
      <FilterButton filter='completed' text='Выполненные задачи' />
      <FilterButton filter='todo' text='Задачи в работе' />
      <FilterButton filter='favourite' text='Избранные задачи' />
    </div>
  );
};

export default Filters;
