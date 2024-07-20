import { FC } from 'react';

import styles from './AdminList.module.scss';
import { IAdminListItem } from './admin-list.interface';
import AdminAction from './admin-actions/AdminAction';
import { DASHBOARD_URL } from '@/config/url.config';

const AdminListItem: FC<IAdminListItem> = ({ listItem, removeHandler }) => {
  return <div className={styles.item}>
  {listItem.items.map(value => (
    <div key={value}>{value}</div>
  ))}
  <AdminAction viewUrl={listItem.viewUrl} name={listItem.items[0]}  editUrl={listItem.editUrl} removeHandler={removeHandler}/>
  </div>
};

export default AdminListItem;
