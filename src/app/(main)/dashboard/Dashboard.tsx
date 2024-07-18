'use client'

import { useRouter } from 'next/navigation';
import { FC } from 'react';

import Heading from '@/components/ui/heading/Heading';

import { PUBLIC_URL } from '@/config/url.config';

import { useProfile } from '@/hooks/useProfile';

import { removeFromStorage } from '@/services/auth/auth-token.service';

import styles from './Dashboard.module.scss';
import Image from 'next/image';
import Button from '@/components/ui/form-elements/button/Button';

const Dashboard: FC = () => {
  const { user } = useProfile();
  const { push } = useRouter();

  if (!user) return null;

  const logout = () => {
    removeFromStorage();
    push(PUBLIC_URL.auth());
  };

  return (
    <div className="px-6">
      <div className={styles.wrapper}>
        <Heading className={styles.heading}>Привет, {user.name}</Heading>
        <div className={styles.avatar}>
          <Image src={user.avatarPath} alt={user.name} width={180} height={180} className='rounded-md'/>
        </div>
        <Button className={styles.button} variant='outline' onClick={() => logout()}>Выйти</Button>
      </div>
    </div>
  );
};

export default Dashboard;
