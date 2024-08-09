'use client';

import type { Metadata } from 'next';

import AdminHeader from '@/components/ui/admin/admin-statistics/admin-table/admin-header/AdminHeader';
import AdminList from '@/components/ui/admin/admin-statistics/admin-table/admin-list/AdminList';
import Heading from '@/components/ui/heading/Heading';

import { NO_INDEX_PAGE } from '@/constants/seo.constants';

import { useAdminGenres } from './useAdminGenres';

export const metadata: Metadata = {
  title: 'Жанры',
  ...NO_INDEX_PAGE
};

export default function Genres() {
  const {
    handleClearSearch,
    handleSearch,
    genres,
    searchTerm,
    isLoading,
    createAsync,
    deleteAsync
  } = useAdminGenres();
  return (
    <div className="px-6">
      <Heading>Фильмы</Heading>

      <AdminHeader
        handleClearSearch={handleClearSearch}
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        onClick={createAsync}
      />
      <AdminList
        listItems={genres || []}
        isLoading={isLoading}
        headerItems={['Название', 'Ссылка']}
        removeHandler={deleteAsync}
      />
    </div>
  );
}
