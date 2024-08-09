import { Icon } from '../../Icon';
import SkeletonLoader from '../../SkeletonLoader';
import FileUpload from '../../fileUpload/FileUpload';
import Field from '../../form-elements/field/Field';
import Heading from '../../heading/Heading';
import {  ConfigProvider, Modal } from 'antd';
import { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { IUser, IUserEditInput } from '@/types/user.types';

import { useProfileChange } from './useProfileChange';

import styles from '../Profile.module.scss';
import Button from '../../form-elements/button/Button';

interface IProfileChange {
  IsShort: boolean;
  user: IUser | undefined;
}

const ProfileChange: FC<IProfileChange> = ({ IsShort, user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { onSubmit } = useProfileChange(user);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const {
    handleSubmit,
    register,
    control,
    formState: { errors }
  } = useForm<IUserEditInput>({
    mode: 'onChange',
    values: {
      name: user?.name,
      avatarPath: user?.avatarPath 
    }
  });

 

  const handleCancel = () => {
    setIsModalOpen(false);
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
        open={isModalOpen}
        onOk={handleCancel}
        onCancel={handleCancel}
        okText="Применить"
        cancelText="Отмена"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className='border-b-[1px] border-gray-700 mb-4'>
          <Controller
            name="avatarPath"
            control={control}
            defaultValue=""
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <FileUpload
                onChange={onChange}
                value={value}
                error={error}
                folder="avatars"
                placeholder="Аватарка"
                style={{ marginTop: 15 }}
              />
            )}
            rules={{
              required: 'Аватарка обязательна!'
            }}
          />
          <Field
            {...register('name', {
              required: 'Имя обязательно!'
            })}
            placeholder="Имя"
            error={errors.name}
            style={{ width: '31%',paddingLeft:0 }}
          />
          </div>
          <Button className='px-4'>Сохранить</Button>
        </form>
      </Modal>
    </ConfigProvider>
  );
};

export default ProfileChange;
