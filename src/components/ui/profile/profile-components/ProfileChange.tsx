import { Icon } from '../../Icon';
import SkeletonLoader from '../../SkeletonLoader';
import FileUpload from '../../fileUpload/FileUpload';
import Heading from '../../heading/Heading';
import { Button, ConfigProvider, Modal } from 'antd';
import { FC, useState } from 'react';

// Поправлен импорт
import Loading from '@/app/loading';

import { IUser } from '@/types/user.types';

import { useProfileChange } from './useProfileChange';

import styles from '../Profile.module.scss';

interface IProfileChange {
  IsShort: boolean;
  user: IUser | undefined;
}

const ProfileChange: FC<IProfileChange> = ({ IsShort, user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [avatarPath, setAvatarPath] = useState<string | null>(null); // Уточнение типа для avatarPath
  const [name, setName] = useState<string>(''); // Уточнение типа для name

  const { mutate } = useProfileChange(user); // Исправлен вызов хука useProfileChange

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if (user) {
      const data = {
        name: name || user?.name,
        avatarPath: `/uploads/avatars/${avatarPath}` || user?.avatarPath
      };
      mutate(data);
      setIsModalOpen(false);
      window.location.reload();
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handlerChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

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
    }
  };

  console.log(name, avatarPath);

  return (
    <ConfigProvider theme={theme}>
      <Heading className={styles.heading}>
        {IsShort ? 'Профиль ' : 'Привет, '}
        {user?.name ? user?.name : <SkeletonLoader className="w-20 h-8" />}
        {!IsShort && (
          <div onClick={showModal}>
            <Icon
              name="LuPencil"
              className="size-[14px] mt-[2px] hover:cursor-pointer"
              color="red"
            />
          </div>
        )}
      </Heading>
      <Modal
        title="Изменение профиля"
        open={isModalOpen} // Исправлено свойство на visible
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Применить"
        cancelText="Отмена"
      >
        <FileUpload setAvatarPath={setAvatarPath} />
        <input
          type="text"
          value={name}
          className="text-black"
          onChange={handlerChangeName}
        />
      </Modal>
    </ConfigProvider>
  );
};

export default ProfileChange;
