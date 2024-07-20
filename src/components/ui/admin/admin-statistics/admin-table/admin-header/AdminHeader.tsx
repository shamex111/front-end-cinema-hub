import { ChangeEvent, FC } from 'react'
import styles from './AdminHeader.module.scss'
import SearchField from '@/components/ui/search-field/SearchField';
import AdminCreateButton from './AdminCreateButton';
interface IAdminHeader {
    onClick?: () => void;
    searchTerm:string;
    handleSearch: (e:ChangeEvent<HTMLInputElement>) => void,
    handleClearSearch: () => void
}

const AdminHeader: FC<IAdminHeader> = ({onClick,searchTerm,handleSearch, handleClearSearch}) => {
  return <div className={styles.header}>
    <SearchField className={styles.searchField} searchTerm={searchTerm} handlerSearch={handleSearch} handleClearSearch={handleClearSearch}/>
    {onClick && <AdminCreateButton onClick={onClick} />}
  </div>
}

export default AdminHeader