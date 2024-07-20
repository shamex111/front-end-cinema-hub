import { FC } from 'react';
import { GrView } from 'react-icons/gr';
import { RiMovie2Line } from 'react-icons/ri';
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip
} from 'recharts';

import { ITopMovie } from '@/types/statistics.types';

import styles from './TopMovies.module.scss';
import TopMoviesTooltip from './TopMoviesTooltip';

const COLORS = ['#B61C1C', '#822A2A', '#79A0A', '790A0A', '#5D0B0B'];
interface ITopMovies {
  data: ITopMovie[];
}

const TopMovies: FC<ITopMovies> = ({ data }) => {
  return (
    <div className={styles.top_movies}>
      <ResponsiveContainer width="100%" height={390}>
        <PieChart>
          <Legend
            layout="horizontal"
            verticalAlign="bottom"
            align="right"
            iconType="circle"
            content={({ payload }: any) => {
              return (
                <ul>
                  <div className="flex justify-between pb-2">
                    <RiMovie2Line color="grey" size={22} />
                    <GrView className="mx-1" color="grey" size={20} />
                  </div>
                  {payload.map((entry: any, index: number) => (
                    <li key={index} className={styles.pie_item}>
                      <p className="flex m-0 p-0 ">{index+1}. {entry.payload.title}</p>
                      <p className="flex m-0">{entry.payload.views}</p>
                    </li>
                  ))}
                </ul>
              );
            }}
          />
          <Tooltip content={<TopMoviesTooltip />} />
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={135}
            innerRadius={100}
            paddingAngle={4}
            stroke="none"
            dataKey="views"

          >
            {data.map((_entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
                style={{ outline: 'none' }}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopMovies;
