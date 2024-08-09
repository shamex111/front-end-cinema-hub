'use client';

import type { Metadata } from 'next';

import AdminHeader from '@/components/ui/admin/admin-statistics/admin-table/admin-header/AdminHeader';
import AdminList from '@/components/ui/admin/admin-statistics/admin-table/admin-list/AdminList';
import Heading from '@/components/ui/heading/Heading';

import { NO_INDEX_PAGE } from '@/constants/seo.constants';

import { useAdminActors } from './useAdminActors';

export const metadata: Metadata = {
  title: 'Жанры',
  ...NO_INDEX_PAGE
};

export default function Actors() {
  const {
    handleClearSearch,
    handleSearch,
    actors,
    searchTerm,
    isLoading,
    createAsync,
    deleteAsync
  } = useAdminActors();
  return (
    <div className="px-6">
      <Heading>Актеры</Heading>

      <AdminHeader
        handleClearSearch={handleClearSearch}
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        onClick={createAsync}
      />
      <AdminList
        listItems={actors || []}
        isLoading={isLoading}
        headerItems={['Имя', 'Ссылка','Кол-во фильмов']}
        removeHandler={deleteAsync}
      />
    </div>
  );
}
