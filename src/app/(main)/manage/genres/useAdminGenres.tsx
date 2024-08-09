import { IListItem } from '../../../../components/ui/admin/admin-statistics/admin-table/admin-list/admin-list.interface';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ChangeEvent, useMemo, useState } from 'react';
import toast from 'react-hot-toast';

import { ADMIN_URL, DASHBOARD_URL, PUBLIC_URL } from '@/config/url.config';

import { useDebounce } from '@/hooks/useDebounce';

import { genreService } from '@/services/genre.service';
import { useRouter } from 'next/navigation';

export const useAdminGenres = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);

  const queryClient = useQueryClient();

  const { data: genres, isLoading } = useQuery({
    queryKey: ['get genres for admin dashboard', debouncedSearch],
    queryFn: () => genreService.getAll(debouncedSearch),
    select: data =>
      data.map(
        (genre): IListItem => ({
          id: genre.id,
          editUrl: ADMIN_URL.genresEdit(genre.id),
          name: 'Жанр ' + genre.name,
          items: [
           genre.name,
           genre.slug

          ],
          viewUrl: PUBLIC_URL.genre(genre.slug)
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
    mutationKey: ['delete genre'],
    mutationFn: () => genreService.create(),
    onSuccess({data:id}) {
      toast.success('Жанр создан'),
      push(ADMIN_URL.genresEdit(id))
        queryClient.invalidateQueries({
          queryKey: ['get genres for admin dashboard']
        });
    },
    onError() {
      toast.error('Ошибка при удалении');
    }
  });
 
  const { mutateAsync: deleteAsync } = useMutation({
    mutationKey: ['delete genre'],
    mutationFn: (genreId: string) => genreService.delete(genreId),
    onSuccess() {
      toast.success('Жанр удален'),
        queryClient.invalidateQueries({
          queryKey: ['get genres for admin dashboard']
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
      genres,
      isLoading,
      handleClearSearch,
      deleteAsync,
      createAsync
    }),
    [handleSearch, searchTerm, genres, isLoading, handleClearSearch, deleteAsync]
  );
};
