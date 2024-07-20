import { FC } from 'react'
import styles from './TopMovies.module.scss'
import Loader from '@/components/ui/Looader'
const TopMoviesLoading: FC = () => {
  return <div className={styles.top_movies}>
    <div className='h-[390px] w-full flex items-center justify-center'>
      <Loader size='size-10'/>
    </div>
  </div>
}

export default TopMoviesLoading