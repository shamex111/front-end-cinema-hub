import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import { PUBLIC_URL } from '@/config/url.config';

import { IMovie } from '@/types/movie.types';

import styles from './SearchList.module.scss';

interface ISearchList {
  movies: IMovie[];
}

const SearchList: FC<ISearchList> = ({ movies }) => {
  return (
    <div className={styles.list}>
      {movies.length ? (
        movies.map(movie => (
          <Link
            href={PUBLIC_URL.movie(movie.slug)}
            key={movie.id}
            className={styles.item}
          >
            <Image
              src={movie.poster}
              width={70}
              height={80}
              alt={movie.title}
              objectFit="top"
              objectPosition="top"
              className="rounded-md"
            />
            <div>{movie.title}</div>
          </Link>
        ))
      ) : (
        <div className={styles.notFound}>Ничего не найдено</div>
      )}
    </div>
  );
};

export default SearchList;
