'use client'

import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';

import Heading from '@/components/ui/heading/Heading';

import { statisticsService } from '@/services/statistics.service';

import styles from './MainStatistics.module.scss';
import StatisticItem from './StatisticItem';
import StatisticsItemLoading from './StatisticsItemLoading';

const MainStatistics: FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['get main statistics'],
    queryFn: () => statisticsService.getMain()
  });
  return (
    <div>
      <Heading>Статистика</Heading>
      <div className={styles.main_statistics}>
        {isLoading ? (
          Array.from({length:4}).map((_, index) => (
            <StatisticsItemLoading key={index} />
          ))
        ) : data ? (
          data.map(item => <StatisticItem key={item.id} item={item} />)
        ) : (
          <div>-Нет данных для main-статистики</div>
        )}
      </div>
    </div>
  );
};

export default MainStatistics;
