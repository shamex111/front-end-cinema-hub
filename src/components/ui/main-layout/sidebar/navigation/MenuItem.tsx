'use client'
import { FC } from 'react'
import { IMenuItem } from './menu.interface'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import cn from 'clsx'
import { Icon } from '@/components/ui/Icon'
import styles from './Menu.module.scss'
const MenuItem: FC<{item: IMenuItem}> = ({item}) => {
    const pathname = usePathname()

    return (
        <Link href={item.link} className={cn(styles.item, {
            [styles.active] : pathname === item.link
        })}>
            <Icon name={item.icon} className={styles.icon}/>
            {item.value}
        </Link>
    )
}

export default MenuItem