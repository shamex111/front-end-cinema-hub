import type { Metadata } from 'next';

import { IGalleryItem } from '@/components/ui/gallery/gallery.interface';
import { ISlide } from '@/components/ui/slider/slider.interface';

import { PUBLIC_URL } from '@/config/url.config';

import { actorService } from '@/services/actor.service';
import { genreService } from '@/services/genre.service';
import { movieService } from '@/services/movie.service';

import { getGenresList } from '@/utils/movie/getGenresList';

import Home from './Home';

export const metadata: Metadata = {
  title: 'Смотреть фильмы онлайн'
};
export const revalidate = 300;

async function getContent() {
  const movies = await movieService.getAll();
  const trendingMoviesDATA = await movieService.getMostPopular();
  const actorDATA = await actorService.getAll();
  const genresDATA = await genreService.getAll();

  const slides: ISlide[] = movies
    .map(movie => ({
      id: movie.id,
      link: PUBLIC_URL.movie(movie.slug),
      subTitle: getGenresList(movie.genres),
      title: movie.title,
      bigPoster: movie.bigPoster,
      isGenre: false
    }))
    .slice(0, 4);

  const trendingMovies: IGalleryItem[] = trendingMoviesDATA.map(movie => ({
    poster: movie.poster,
    link: PUBLIC_URL.movie(movie.slug),
    name: movie.title,
    isGenre: false,
    content: {
      title: movie.title,
      subTitle: getGenresList(movie.genres,movie.genres.length-1)
    }
  }));

  const actor: IGalleryItem[] = actorDATA
    .map(actor => ({
      poster: actor.photoUrl,
      link: PUBLIC_URL.actor(actor.slug),
      name: actor.name,
      isGenre: false,
      content: {
        title: actor.name,
        subTitle: `${String(actor.movies.length)} фильмов`
      }
    }))
    .slice(0, 4);

  const genres: IGalleryItem[] = genresDATA
    .map(genre => ({
      poster: genre.icon,
      link: PUBLIC_URL.genre(genre.slug),
      name: genre.name,
      isGenre: true,
      content: {
        title: genre.name
      }
    }))
    .slice(0, 6);
  return { genres, actor, trendingMovies, slides };
}
export default async function HomePage() {
  const { slides, actor, trendingMovies, genres } = await getContent();

  return (
    <Home
      slides={slides}
      genres={genres}
      actor={actor}
      trendingMovies={trendingMovies}
    />
  );
}
