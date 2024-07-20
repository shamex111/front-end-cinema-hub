import { Icon } from '../Icon';
import cn from 'clsx';
import { ChangeEvent, FC } from 'react';

import styles from './SearchField.module.scss';

interface ISearchField {
  searchTerm: string;
  handlerSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  handleClearSearch: () => void;
  className:string
}

const SearchField: FC<ISearchField> = ({
  searchTerm,
  handlerSearch,
  handleClearSearch,
  className
}) => {
  return (
    <label className={cn(styles.search, className)}>
      <Icon name="LuSearch" className={cn(styles.icon, 'ml-2 size-5 ')} />
      <input
        type="text"
        placeholder="Поиск..."
        value={searchTerm}
        onChange={handlerSearch}
      />
      {searchTerm && (
        <p
          className="mr-2 cursor-pointer hover:text-white transition-all duration-200 text-gray-600 text-[23px]"
          onClick={handleClearSearch}
        >
          🞨
        </p>
      )}
    </label>
  );
};

export default SearchField;
