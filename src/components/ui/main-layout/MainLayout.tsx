import { FC, PropsWithChildren } from 'react'
import styles from './MainLayout.module.scss'
import Sidebar from './sidebar/Sidebar'
import Header from './header/Header'
const MainLayout: FC<PropsWithChildren<unknown>> = ({children}) => {
  return <div className={styles.layout}>
    <div className="flex-1">
      <Header />
      <Sidebar />
      <main>{children}</main>
    </div>
  </div>
}

export default MainLayout