'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';

import SkeletonLoader from '@/components/ui/SkeletonLoader';
import formStyles from '@/components/ui/form-elements/AdminForm.module.scss';
import Button from '@/components/ui/form-elements/button/Button';
import Select from '@/components/ui/form-elements/select/Select';
import Heading from '@/components/ui/heading/Heading';

import { IUserEditInput, UserRole } from '@/types/user.types';

import { useUserEdit } from './useUserEdit';

interface IUserEdit {
  userId: string;
}

const UserEdit: FC<IUserEdit> = ({ userId }) => {
  const { user, onSubmit, isLoading } = useUserEdit(userId);
  const router = useRouter();
  const back = () => {
    router.back();
  };
  const {
    handleSubmit,
    register,
    control,
    formState: { errors }
  } = useForm<IUserEditInput>({
    mode: 'onChange',
    values: {
      role: user?.role || UserRole.USER,
      isHasPremium: String(user?.isHasPremium) || 'false' 
    }
  });

  const roles = [
    {
      label: 'Админ',
      value: UserRole.ADMIN
    },
    {
      label: 'Пользователь',
      value: UserRole.USER
    }
  ];
  const isHasPremium = [
    {
      label: 'Нет премиума',
      value: 'false'
    },
    {
      label: 'Есть премиум',
      value: 'true'
    }
  ];
  return (
    <div className="px-6">
      <div className="flex items-center gap-2">
        <Image
          onClick={back}
          src="/images/strelka_vlevo_dnqp3nj9xgp7_16 (1).png"
          alt="Назад"
          width={14}
          height={14}
          className="hover:cursor-pointer"
        />
        <Heading className="flex items-center gap-2">
          Настройка пользователя{' '}
          {isLoading ? <SkeletonLoader className="h-8 w-32" /> : user?.name}
        </Heading>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={formStyles.form}>
        {isLoading ? (
          <div className="gap-9 mt-14">
            {Array.from({ length: 1 }).map((_, index) => (
              <SkeletonLoader className="h-10 w-[40%]" key={index} />
            ))}
          </div>
        ) : (
          <>
            <Controller
              name="role"
              control={control}
              rules={{
                required: 'Пожалуйста выберите роль!'
              }}
              render={({ field, fieldState: { error } }) => (
                <Select
                  error={error}
                  field={field}
                  placeholder="Роль"
                  options={roles || []}
                  isMulti={false}
                />
              )}
            />
            <Controller
              name="isHasPremium"
              control={control}
              rules={{
                required: 'Пожалуйста выберите состояние премиума пользователя!'
              }}
              render={({ field, fieldState: { error } }) => (
                <Select
                  error={error}
                  field={field}
                  placeholder="Премиум"
                  options={isHasPremium || []}
                  isMulti={false}
                />
              )}
            />
            <Button className="px-4">Сохранить</Button>
          </>
        )}
      </form>
    </div>
  );
};

export default UserEdit;
