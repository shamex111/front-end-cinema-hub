'use client';

import { Icon } from '../Icon';
import Loader from '../Looader';
import SkeletonLoader from '../SkeletonLoader';
import Button from '../form-elements/button/Button';
import Heading from '../heading/Heading';
import Image from 'next/image';
import { FC } from 'react';
import CountUp from 'react-countup';
import { MdOutlineUpdate } from 'react-icons/md';
import { MdOutlineReviews } from 'react-icons/md';
import { MdOutlineWorkspacePremium } from 'react-icons/md';
import { RiAdminLine } from 'react-icons/ri';

import { PUBLIC_URL } from '@/config/url.config';

import { useProfile } from '@/hooks/useProfile';

import { removeFromStorage } from '@/services/auth/auth-token.service';

import styles from './Profile.module.scss';
import ProfileItemLoading from './ProfileItemLoading';
import ProfileContent from './profile-components/ProfileContent';

const Profile: FC = () => {
  const { isLoading, user } = useProfile();

  const logout = () => {
    removeFromStorage();
    window.location.reload();
  };
  return (
    <div>
      <ProfileContent IsShort={false} logout={logout} user={user} isLoading={isLoading} />
    </div>
  );
};

export default Profile;
