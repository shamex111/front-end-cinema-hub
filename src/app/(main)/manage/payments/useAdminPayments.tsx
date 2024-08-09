import { IListItem } from '../../../../components/ui/admin/admin-statistics/admin-table/admin-list/admin-list.interface';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { paymentService } from '@/services/payment.service';

import { PaymentStatus } from '@/types/payment.types';
import { formatDate } from '@/utils/date/formatDate';
import { convertPrice } from '@/utils/string/convertPrise';

export const useAdminPayments = () => {
  const { data: payments, isLoading } = useQuery({
    queryKey: ['get payments for admin dashboard'],
    queryFn: () => paymentService.getAll(),
    select: data =>
      data.map(
        (payment): IListItem => ({
          
          id: payment.id,
          name: 'Отзыв ' + payment?.id,
          items: [
            payment.user.name,
            convertPrice(payment.amount),
            payment.status === PaymentStatus.PENDING ? 'В ожидании' : 'Оплачен',
            formatDate(payment.createdAt),
          ]
        })
      )
  });

  return useMemo(
    () => ({
      payments,
      isLoading
    }),
    [payments, isLoading]
  );
};
