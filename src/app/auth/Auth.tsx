'use client';

import Image from 'next/image';
import { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import Button from '@/components/ui/form-elements/button/Button';
import Heading from '@/components/ui/heading/Heading';

import { IAuthForm } from '@/types/auth.types';

import styles from './Auth.module.scss';
import AuthFields from './AuthFields';
import authImage from 'public/images/auth.svg'
import { useAuthMutation } from './useAuthMutation';
const Auth: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<IAuthForm>({
    mode: 'onChange'
  });

  const [isLoginForm, setIsLoginForm] = useState(false);

  const {mutate} = useAuthMutation(isLoginForm,reset)

  const onSubmit: SubmitHandler<IAuthForm> = data => {
    mutate(data)
};
  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <Heading className={styles.heading}>{isLoginForm ? 'Войти в аккаунт' : 'Регистрация'}</Heading>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <AuthFields
            register={register}
            errors={errors}
            isLoginForm={isLoginForm}
          />
          <Button className={styles.button}>
            {isLoginForm ? 'Войти' : 'Создать аккаунт'}
          </Button>
          <div className={styles.toggle}>
            {isLoginForm ? 'Еще нет аккаунта?' : 'Уже есть аккаунт?' }
            <span className={styles.vl}> | </span>
          <button
            type="button"
            onClick={() => setIsLoginForm(!isLoginForm)}
            className="text-primary"
          >
            {isLoginForm ? 'Создать аккаунт' : 'Войти в аккаунт'}
          </button>
          </div>
        </form>
      </div>
      <div className={styles.right}>
        <Image src="/images/auth.svg" height={150} width={150} alt="Авторизация" />
      </div>
    </div>
  );
};

export default Auth;
