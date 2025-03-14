import type { Metadata } from 'next';
import Link from 'next/link';

import Button from '@/components/ui/form-elements/button/Button';
import Heading from '@/components/ui/heading/Heading';

import { DASHBOARD_URL } from '@/config/url.config';

import { NO_INDEX_PAGE } from '@/constants/seo.constants';

import styles from './Thanks.module.scss';

export const metadata: Metadata = {
  title: 'Успешная покупка'
};

export default function ThanksPage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.area}>
        <Heading>Успешная покупка</Heading>
        <p>Спасибо Вам за приобритение премиум-подписки на нашем сайте.</p>
        <Link href={DASHBOARD_URL.root()}>
          <Button className=' px-2 text-lg'>Перейти в личный кабинет</Button>
        </Link>
      </div>
    </div>
  );
}
