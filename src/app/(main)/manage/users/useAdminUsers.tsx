import { IListItem } from '../../../../components/ui/admin/admin-statistics/admin-table/admin-list/admin-list.interface';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ChangeEvent, useMemo, useState } from 'react';
import toast from 'react-hot-toast';

import { ADMIN_URL, DASHBOARD_URL } from '@/config/url.config';

import { useDebounce } from '@/hooks/useDebounce';

import { userService } from '@/services/user.service';

import { UserRole } from '@/types/user.types';

export const useAdminUsers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);

  const queryClient = useQueryClient();

  const { data: users, isLoading } = useQuery({
    queryKey: ['get users for admin dashboard', debouncedSearch],
    queryFn: () => userService.getAll(debouncedSearch),
    select: data =>
      data.map(
        (user): IListItem => ({
          withAvatar:true,
          id: user.id,
          name: 'Пользователя ' + user.name,
          editUrl: ADMIN_URL.usersEdit(user.id),
          items: [
            user.avatarPath,
            user.name,
            user.email,
            user.role === UserRole.USER ? 'Пользователь' : 'Админ',
            user.isHasPremium ? 'true' : 'false',
          ],
          viewUrl: DASHBOARD_URL.findUsers(user.name)
        })
      )
  });
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const { mutateAsync: deleteAsync } = useMutation({
    mutationKey: ['delete user'],
    mutationFn: (userId: string) => userService.delete(userId),
    onSuccess() {
      toast.success('Пользователь удален'),
        queryClient.invalidateQueries({
          queryKey: ['get users for admin dashboard']
        });
    },
    onError() {
      toast.error('Ошибка при удалении');
    }
  });

  return useMemo(
    () => ({
      handleSearch,
      searchTerm,
      users,
      isLoading,
      handleClearSearch,
      deleteAsync
    }),
    [handleSearch, searchTerm, users, isLoading, handleClearSearch, deleteAsync]
  );
};
