'use client';

import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';

import { statisticsService } from '@/services/statistics.service';

import styles from './MiddleStatistics.module.scss';
import TopMoviesLoading from './top-movies/TopMoviesLoading';
import SalesChartLoading from './sales-chart/SalesChartLoading';
import TopMovies from './top-movies/TopMovies';
import SalesChart from './sales-chart/SalesChart';

const MiddleStatistics: FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['get middle statistics'],
    queryFn: () => statisticsService.getMiddle()
  });

  return (
    <div className={styles.wrapper}>
      {isLoading ? (
        <>
          <div className={styles.top_movies}>
            <TopMoviesLoading />
          </div>
          <div className={styles.sales_chart}>
            <SalesChartLoading />
          </div>
        </>
      ) : data ? (
        <>
          <div className={styles.top_movies}>
            <TopMovies data={data.topMovies} />
          </div>
          <div className={styles.sales_chart}>
            <SalesChart data={data.salesByWeek}/>
          </div>
        </>
      ) : (
        <div>-Нет данных для middle-статистики</div>
      )}
    </div>
  );
};

export default MiddleStatistics;
