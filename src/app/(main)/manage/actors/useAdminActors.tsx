import { IListItem } from '../../../../components/ui/admin/admin-statistics/admin-table/admin-list/admin-list.interface';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ChangeEvent, useMemo, useState } from 'react';
import toast from 'react-hot-toast';

import { ADMIN_URL, DASHBOARD_URL, PUBLIC_URL } from '@/config/url.config';

import { useDebounce } from '@/hooks/useDebounce';

import { actorService } from '@/services/actor.service';
import { useRouter } from 'next/navigation';

export const useAdminActors = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);

  const queryClient = useQueryClient();

  const { data: actors, isLoading } = useQuery({
    queryKey: ['get actors for admin dashboard', debouncedSearch],
    queryFn: () => actorService.getAll(debouncedSearch),
    select: data =>
      data.map(
        (actor): IListItem => ({
          id: actor.id,
          editUrl: ADMIN_URL.actorsEdit(actor.id),
          name: 'Актера ' + actor.name,
          items: [
           actor.name,
           actor.slug,
          String(actor.movies.length)
          ],
          viewUrl: PUBLIC_URL.actor(actor.slug)
        })
      )
  });

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const {push} = useRouter()

  const { mutateAsync: createAsync } = useMutation({
    mutationKey: ['delete actor'],
    mutationFn: () => actorService.create(),
    onSuccess({data:id}) {
      toast.success('Актер создан'),
      push(ADMIN_URL.actorsEdit(id))
        queryClient.invalidateQueries({
          queryKey: ['get actors for admin dashboard']
        });
    },
    onError() {
      toast.error('Ошибка при удалении');
    }
  });
 
  const { mutateAsync: deleteAsync } = useMutation({
    mutationKey: ['delete actor'],
    mutationFn: (actorId: string) => actorService.delete(actorId),
    onSuccess() {
      toast.success('Актер удален'),
        queryClient.invalidateQueries({
          queryKey: ['get actors for admin dashboard']
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
      actors,
      isLoading,
      handleClearSearch,
      deleteAsync,
      createAsync
    }),
    [handleSearch, searchTerm, actors, isLoading, handleClearSearch, deleteAsync]
  );
};
