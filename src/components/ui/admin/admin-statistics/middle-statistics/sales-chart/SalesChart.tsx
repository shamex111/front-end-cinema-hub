import { ISalesByWeek } from '@/types/statistics.types'
import { FC } from 'react'
 
interface ISalesChart {
    data:ISalesByWeek[]
}
const SalesChart: FC<ISalesChart> = ({data}) => {
  return <div>SalesChart</div>
}

export default SalesChart