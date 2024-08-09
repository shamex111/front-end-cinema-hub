'use client';

import type { Metadata } from 'next';

import AdminHeader from '@/components/ui/admin/admin-statistics/admin-table/admin-header/AdminHeader';
import AdminList from '@/components/ui/admin/admin-statistics/admin-table/admin-list/AdminList';
import Heading from '@/components/ui/heading/Heading';

import { NO_INDEX_PAGE } from '@/constants/seo.constants';

import { useAdminReviews } from './useAdminReviews';

export const metadata: Metadata = {
  title: 'Отзывы',
  ...NO_INDEX_PAGE
};

export default function Reviews() {
  const {
    reviews,
    isLoading,
    deleteAsync
  } = useAdminReviews();
  return (
    <div className="px-6">
      <Heading>Отзывы</Heading>

      <AdminList
        listItems={reviews || []}
        isLoading={isLoading}
        headerItems={['Фильм','Отзыв','Рейтинг', 'Имя пользователя']}
        removeHandler={deleteAsync}
      />
    </div>
  );
}
