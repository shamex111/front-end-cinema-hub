'use client';

import { FC } from 'react';

import Gallery from '@/components/ui/gallery/Gallery';
import { IGalleryItem } from '@/components/ui/gallery/gallery.interface';
import Heading from '@/components/ui/heading/Heading';
import Slider from '@/components/ui/slider/Slider';
import { ISlide } from '@/components/ui/slider/slider.interface';

interface IHome {
  slides: ISlide[];
  genres: IGalleryItem[];
  trendingMovies: IGalleryItem[];
  actor: IGalleryItem[];
}

const Home: FC<IHome> = ({ slides, trendingMovies, actor, genres }) => {
  return (
    <div className="flex flex-col">
      {slides.length && <Slider slides={slides} />}
      <div className="px-6 my-3">
        <Heading className="text-xl mb-2">В тренде</Heading>
        {trendingMovies.length && <Gallery items={trendingMovies} />}
      </div>
      <div className="px-6 my-3">
        <Heading className="text-xl mb-2">Лучшие актеры</Heading>
        {actor.length && <Gallery items={actor} />}
      </div>
      <div className="px-6 my-3">
        <Heading className="text-xl mb-2">Лучшие жанры</Heading>
        {genres.length && <Gallery items={genres} />}
      </div>
    </div>
  );
};

export default Home;
