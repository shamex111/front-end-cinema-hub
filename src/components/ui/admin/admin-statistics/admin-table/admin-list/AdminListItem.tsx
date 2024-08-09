import Image from 'next/image';
import { FC } from 'react';

import { API_URL } from '@/config/api.config';
import { DASHBOARD_URL } from '@/config/url.config';

import styles from './AdminList.module.scss';
import AdminAction from './admin-actions/AdminAction';
import { IAdminListItem } from './admin-list.interface';

const AdminListItem: FC<IAdminListItem> = ({ listItem, removeHandler }) => {
  return (
    <div className={styles.item}>
      {listItem.withAvatar
        ? listItem.items.map(value => {
            if (listItem.items[0] === value) {
              return (
                <div key={value}>
                <Image
                  src={value}
                  alt="Нет фото"
                  width={30}
                  height={30}
                  className="rounded-full"
                />
                </div>
              );
            } else {
              return <div key={value}>{value}</div>;
            }
          })
        : listItem.items.map(value => {
            return <div key={value}>{value}</div>;
          })}

      <AdminAction
        viewUrl={listItem.viewUrl}
        editUrl={listItem.editUrl}
        name={listItem.name}
        removeHandler={removeHandler}
      />
    </div>
  );
};

export default AdminListItem;
