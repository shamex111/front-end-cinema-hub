'use client'

import { FC } from 'react'
import styles from './Search.module.scss'
import SearchField from '@/components/ui/search-field/SearchField'
import { useSearch } from './useSearch'
import SearchList from './search-list/SearchList'
const Search: FC = () => {
  const {handleSearch, isSuccess, searchTerm, data} = useSearch()
  return <div className={styles.search}>
    <SearchField handlerSearch={handleSearch} searchTerm={searchTerm}/>
    {isSuccess && <SearchList movies={data || []}/>}
  </div>
}

export default Search