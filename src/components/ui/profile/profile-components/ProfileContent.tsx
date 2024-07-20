'use client';

import Loader from '../../Looader';
import SkeletonLoader from '../../SkeletonLoader';
import Button from '../../form-elements/button/Button';
import Heading from '../../heading/Heading';
import ProfileItemLoading from '../ProfileItemLoading';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FC, useEffect } from 'react';
import {
  MdOutlineReviews,
  MdOutlineUpdate,
  MdOutlineWorkspacePremium
} from 'react-icons/md';
import { RiAdminLine } from 'react-icons/ri';

import ProfileUserAvatar from './ProfileUserAvatar';

import styles from '../Profile.module.scss';
import { IUser } from '@/types/user.types';
import { Icon } from '../../Icon';
import ProfileChange from './ProfileChange';

interface IProfileContent {
  logout?: () => void;
  user: IUser | undefined;
  isLoading: boolean;
  IsShort: boolean;
}

const ProfileContent: FC<IProfileContent> = ({
  logout,
  user,
  isLoading,
  IsShort
}) => {
  const router = useRouter();
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/404');
    }
  }, [isLoading, user]);
  return (
    <div>
      <ProfileChange IsShort={IsShort} user={user} />
      <div className="flex gap-20">
        {isLoading ? (
          <>
            <div className={styles.user_info}>
              {Array.from({ length: 4 }).map((_, index) => (
                <ProfileItemLoading key={index} />
              ))}
            </div>
            <div className="my-auto ml-20">
              <Loader size="size-8" />
            </div>
          </>
        ) : (
          user && (
            <>
              <div className={styles.user_info}>
                <div className={styles.item}>
                  <div className={styles.header}>
                    <p className={styles.name}>Дата регистрации</p>
                    <MdOutlineUpdate className="size-5" />
                  </div>
                  <Heading>{user.createdAt.toString().slice(0, 10)}</Heading>
                </div>
                <div className={styles.item}>
                  <div className={styles.header}>
                    <p className={styles.name}>Отзывы</p>
                    <MdOutlineReviews className="size-5" />
                  </div>
                  <Heading>{user.reviews?.length}</Heading>
                </div>

                <div className={styles.item}>
                  <div className={styles.header}>
                    <p className={styles.name}>Роль</p>
                    <RiAdminLine className="size-5" />
                  </div>
                  <Heading>
                    {user.role === 'ADMIN' ? (
                      <p className={styles.adminText}>Администратор</p>
                    ) : (
                      <p>Пользователь</p>
                    )}{' '}
                  </Heading>
                </div>
                <div className={styles.item}>
                  <div className={styles.header}>
                    <p className={styles.name}>Премиум</p>
                    <MdOutlineWorkspacePremium className="size-5" />
                  </div>
                  <Heading>
                    {user.isHasPremium ? (
                      <p className={styles.premiumText}>Есть</p>
                    ) : (
                      <p>Нет</p>
                    )}
                  </Heading>
                </div>
                <div className={styles.id}>{`Id: ${user.id}`}</div>
              </div>
              {
                <ProfileUserAvatar
                  IsShort={IsShort}
                  logout={logout || null}
                  user={user}
                />
              }
            </>
          )
        )}
      </div>
    </div>
  );
};

export default ProfileContent;
