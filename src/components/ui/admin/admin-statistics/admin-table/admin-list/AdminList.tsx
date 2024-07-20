import { FC } from 'react'
import { IListItem } from './admin-list.interface'
import styles from './AdminList.module.scss'
import AdminListHeader from './AdminListHeader'
import SkeletonLoader from '@/components/ui/SkeletonLoader'
import AdminListItem from './AdminListItem'
interface IAdminList {
  listItems: IListItem[]
  headerItems: string[]
  isLoading:boolean 
  removeHandler?: (id:string) => void
}

const AdminList: FC<IAdminList> = ({listItems,headerItems, removeHandler, isLoading}) => {
  return <div className='mb-12'>
    <AdminListHeader headerItems={headerItems} />
    {isLoading ? (
      <div className={styles.loading}>
        {Array.from({length:5}).map((_,index) => (
          <SkeletonLoader className='h-11'/>
        )) }
      </div>
    ) : listItems.length ? (
        
        listItems.map((item,index) => ( <AdminListItem key={index} listItem={item}  removeHandler={removeHandler ? () => removeHandler(item.id) : undefined}/>))
      
    )
    
    
    
     : (
      <div className={styles.not_found}>Элементы не найдены</div>
    )}
  </div>
}

export default AdminList