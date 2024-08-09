import { useMutation } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

import { movieService } from '@/services/movie.service';

export const useUpdateCountViews = (slug: string) => {
  const { mutateAsync } = useMutation({
    mutationKey: ['update count views film'],
    mutationFn: () => movieService.updateCountViews(slug),
  });

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current && slug) {
      isFirstRender.current = false;
      mutateAsync().catch(err => {
        console.error("Error updating count views:", err);
      });
    }
  }, [slug, mutateAsync]);
};
