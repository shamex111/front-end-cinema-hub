import { ITopMovie } from '@/types/statistics.types'
import { FC } from 'react'

interface ITopMovies {
    data:ITopMovie[]
}

const TopMovies: FC<ITopMovies> = ({data}) => {
  return <div>TopMovies</div>
}

export default TopMovies