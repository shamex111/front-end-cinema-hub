'use client';

import type { Metadata } from 'next';

import AdminHeader from '@/components/ui/admin/admin-statistics/admin-table/admin-header/AdminHeader';
import AdminList from '@/components/ui/admin/admin-statistics/admin-table/admin-list/AdminList';
import Heading from '@/components/ui/heading/Heading';

import { NO_INDEX_PAGE } from '@/constants/seo.constants';

import { useAdminMovies } from './useAdminMovies';

export const metadata: Metadata = {
  title: 'Фильмы',
  ...NO_INDEX_PAGE
};

export default function Movies() {
  const {
    handleClearSearch,
    handleSearch,
    movies,
    searchTerm,
    isLoading,
    createAsync,
    deleteAsync
  } = useAdminMovies();
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
        listItems={movies || []}
        isLoading={isLoading}
        headerItems={['Название', 'Жанры', 'Просмотры']}
        removeHandler={deleteAsync}
      />
    </div>
  );
}
