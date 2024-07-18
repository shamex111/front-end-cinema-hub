import { ChangeEvent, FC } from 'react'
import styles from './SearchField.module.scss'
import { Icon } from '../Icon'
import cn from 'clsx'
interface ISearchField {
    searchTerm:string,
    handlerSearch: (e: ChangeEvent<HTMLInputElement>) => void  
}

const SearchField: FC<ISearchField> = ({searchTerm, handlerSearch}) => {
  return <label className={styles.search}>
  <Icon name='LuSearch' className={cn(styles.icon, 'ml-2 size-5 ')}/>
  <input type='text' placeholder='Поиск...' value={searchTerm} onChange={handlerSearch}/>
  </label>

}

export default SearchField