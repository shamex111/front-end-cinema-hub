import { IListItem } from '../../../../components/ui/admin/admin-statistics/admin-table/admin-list/admin-list.interface';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ChangeEvent, useMemo, useState } from 'react';
import toast from 'react-hot-toast';

import { ADMIN_URL, DASHBOARD_URL, PUBLIC_URL } from '@/config/url.config';

import { useDebounce } from '@/hooks/useDebounce';

import { movieService } from '@/services/movie.service';
import { getGenresList } from '@/utils/movie/getGenresList';
import { useRouter } from 'next/navigation';

export const useAdminMovies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);

  const queryClient = useQueryClient();

  const { data: movies, isLoading } = useQuery({
    queryKey: ['get movies for admin dashboard', debouncedSearch],
    queryFn: () => movieService.getAll(debouncedSearch),
    select: data =>
      data.map(
        (movie): IListItem => ({
          id: movie.id,
          editUrl: ADMIN_URL.moviesEdit(movie.id),
          items: [
            movie.title,
            getGenresList(movie.genres),
            String(movie.views),
          ],
          name: 'Фильм ' +movie.title,
          viewUrl: PUBLIC_URL.movie(movie.slug)
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
    mutationKey: ['delete movie'],
    mutationFn: () => movieService.create(),
    onSuccess({data:id}) {
      toast.success('Фильм создан'),
      push(ADMIN_URL.moviesEdit(id))
        queryClient.invalidateQueries({
          queryKey: ['get movies for admin dashboard']
        });
    },
    onError() {
      toast.error('Ошибка при удалении');
    }
  });
 
  const { mutateAsync: deleteAsync } = useMutation({
    mutationKey: ['delete movie'],
    mutationFn: (movieId: string) => movieService.delete(movieId),
    onSuccess() {
      toast.success('Фильм удален'),
        queryClient.invalidateQueries({
          queryKey: ['get movies for admin dashboard']
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
      movies,
      isLoading,
      handleClearSearch,
      deleteAsync,
      createAsync
    }),
    [handleSearch, searchTerm, movies, isLoading, handleClearSearch, deleteAsync]
  );
};
