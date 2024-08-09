'use client';

import type { Metadata } from 'next';

import AdminList from '@/components/ui/admin/admin-statistics/admin-table/admin-list/AdminList';
import Heading from '@/components/ui/heading/Heading';

import { NO_INDEX_PAGE } from '@/constants/seo.constants';

import { useAdminPayments } from './useAdminPayments';

export const metadata: Metadata = {
  title: 'Платежи',
  ...NO_INDEX_PAGE
};

export default function Payments() {
  const {
    payments,
    isLoading,
  } = useAdminPayments();
  return (
    <div className="px-6">
      <Heading>Платежи</Heading>

      <AdminList
        listItems={payments || []}
        isLoading={isLoading}
        headerItems={['Пользователь','Сумма','Статус', 'Дата создания']}
      />
    </div>
  );
}
