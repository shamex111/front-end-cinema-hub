import { FC } from 'react';
import CountUp from 'react-countup';

import { Icon } from '@/components/ui/Icon';

import styles from './MainStatistics.module.scss';
import { IStatisticItem } from './statistics-item.interface';
import { getIcon } from './statistics.util';
import Heading from '@/components/ui/heading/Heading';

interface IIStatisticItem {
  item: IStatisticItem;
}

const StatisticItem: FC<IIStatisticItem> = ({ item }) => {
  const Icon = getIcon(item.id);

  return (
    <div className={styles.item}>
      <div className={styles.header}>
        <p className={styles.name}>{item.name}</p>
        <Icon className={styles.icon} />
      </div>
      <Heading>
        <CountUp end={item.value}/>
      </Heading>
    </div>
  );
};

export default StatisticItem;
