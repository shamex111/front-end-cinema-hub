import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { TbDoorEnter } from 'react-icons/tb';
import { TbMovieOff } from 'react-icons/tb';

import Button from '@/components/ui/form-elements/button/Button';
import Heading from '@/components/ui/heading/Heading';

import { PUBLIC_URL } from '@/config/url.config';

import { NO_INDEX_PAGE } from '@/constants/seo.constants';

import styles from './NotFound.module.scss';

export const metadata: Metadata = {
  title: 'Страница не найдена!',
  ...NO_INDEX_PAGE
};

export default function NotFoundPage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.area}>
        {/* <Image src='/images/film-none.svg' width={150} height={150} alt="NotFound"/> */}
        <TbMovieOff color="dark-grey" className="size-44" />
        <Heading className={styles.heading}>404. Страница не найдена</Heading>
        <p className="text-[18px] text-xl">
          Хм, похоже эта страница не существует.
        </p>
        <Link href={PUBLIC_URL.home()} className={styles.link}>
          <p className="text-lg hover:underline flex items-center gap-2"> <TbDoorEnter color='grey'/>Вернуться на главную</p>
        </Link>
      </div>
    </div>
  );
}
