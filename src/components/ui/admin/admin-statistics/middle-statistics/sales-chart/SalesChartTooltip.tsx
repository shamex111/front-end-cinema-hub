import { FC } from 'react'
import styles from '../MiddleStatistics.module.scss'
import { convertPrice } from '@/utils/string/convertPrise'
interface ISalesChartTooltip {
    active?:boolean
    payload?:any[]
    label?:string
}

const SalesChartTooltip: FC<ISalesChartTooltip> = ({active,payload,label}) => {
  if(active && payload && payload.length) {
    return (
        <div className={styles.tooltip}>
            <p className={styles.title}>{label}</p>
            <p className={styles.value}>
                Прибыль:
                <span className={styles.value}>{convertPrice(payload[0].value)}</span>
            </p>

        </div>
    )
  }
  return null
}

export default SalesChartTooltip