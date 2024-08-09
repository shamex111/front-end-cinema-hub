'use client';

import type { Metadata } from 'next';

import AdminHeader from '@/components/ui/admin/admin-statistics/admin-table/admin-header/AdminHeader';
import AdminList from '@/components/ui/admin/admin-statistics/admin-table/admin-list/AdminList';
import Heading from '@/components/ui/heading/Heading';

import { NO_INDEX_PAGE } from '@/constants/seo.constants';

import { useAdminUsers } from './useAdminUsers';

export const metadata: Metadata = {
  title: 'Пользователи',
  ...NO_INDEX_PAGE
};

export default function Users() {
  const {
    handleClearSearch,
    handleSearch,
    users,
    searchTerm,
    isLoading,
    deleteAsync
  } = useAdminUsers();
  return (
    <div className="px-6">
      <Heading>Пользователи</Heading>

      <AdminHeader
        handleClearSearch={handleClearSearch}
        searchTerm={searchTerm}
        handleSearch={handleSearch}
      />
      <AdminList
        listItems={users || []}
        isLoading={isLoading}
        headerItems={['Аватарка','Имя', 'Почта', 'Роль', "Премиум"]}
        removeHandler={deleteAsync}
      />
    </div>
  );
}
