'use client';

import { useParams } from 'next/navigation';
import { FC } from 'react';

import { useUserPage } from './useUserPage';
import ProfileContent from '@/components/ui/profile/profile-components/ProfileContent';

const page: FC = () => {
  const pathname = useParams();

  const {user, isLoading} = useUserPage(pathname.name[0]);
  return <div >
    <ProfileContent IsShort={true} user={user?.data} isLoading={isLoading} />
  </div>;
};

export default page;
