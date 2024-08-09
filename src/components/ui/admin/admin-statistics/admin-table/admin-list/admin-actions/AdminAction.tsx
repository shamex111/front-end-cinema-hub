'use client';

import { IListItem } from '../admin-list.interface';
import { Modal, ConfigProvider } from 'antd';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';

import { Icon } from '@/components/ui/Icon';

import styles from './AdminAction.module.scss';

interface IAdminAction extends Pick<IListItem, 'editUrl' | 'viewUrl'> {
  removeHandler?: () => void;
  name: string;
}

const AdminAction: FC<IAdminAction> = ({ editUrl, viewUrl, removeHandler, name }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    if (removeHandler) {
      removeHandler();
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const { push } = useRouter();

  const theme = {
    token: {
      colorPrimary: 'B61C1C', 
      colorText: '#fff',      
      colorBgBase: '#232323',  
      colorBorder: 'transparent', 
      colorBgContainer: '#343a40',
      boxShadow: 'none',
      boxShadowBase: 'none',
      boxShadowSecondary: 'none'
    },
  };

  return (
    <ConfigProvider theme={theme}>
      <div className={styles.actions}>
        {viewUrl && (
          <button onClick={() => push(viewUrl)}>
            <Icon className={styles.icon} name="LuExternalLink" />
          </button>
        )}
        {editUrl && (
          <button onClick={() => push(editUrl)}>
            <Icon className={styles.icon} name="LuPencil" />
          </button>
        )}
        {
        removeHandler && (
          <>
        <button  onClick={showModal}>
          <Icon className={styles.icon} name="LuTrash" />
        </button>
        <Modal
          title="Подтверждение удаления"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Удалить"
          cancelText="Отмена"
          
        >
          <p>Вы уверены, что хотите удалить <span>{`${name}`}</span>?</p>
        </Modal>
        </>
        )}
      </div>
    </ConfigProvider>
  );
};

export default AdminAction;
