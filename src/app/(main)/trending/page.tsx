import type { Metadata } from 'next';

import { movieService } from '@/services/movie.service';
import Catalog from '@/components/ui/catalog-movies/Catalog';

export const metadata: Metadata = {
  title: 'Популярные фильмы'
};

export const revalidate = 60;

async function getMovies() {
  const data = await movieService.getMostPopular();
  return data;
}

export default async function MoviePage() {
  const data = await getMovies();
  return <div className='px-6'>
    <Catalog title='Популярные фильмы' description='Актуальные фильмы в отличном качестве: легально, безопасно, без рекламы.' movies={data}/>
  </div>;
}
