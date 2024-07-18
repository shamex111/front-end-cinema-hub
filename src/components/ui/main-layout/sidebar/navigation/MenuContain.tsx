'use client'

import { FC } from 'react'
import Menu from './Menu'
import { adminMenu, userMenu } from './menu.data'
import { usePathname } from 'next/navigation'
import { ADMIN_URL } from '@/config/url.config'
import GenreMenu from './genre-menu/GenreMenu'

const MenuContainer: FC = () => {
  const pathname = usePathname()

  const isAdminPage = pathname?.includes(ADMIN_URL.root())
  return <div className='flex flex-col w-full flex-1 '>
    <Menu menu={isAdminPage ? adminMenu : userMenu} />
    {!isAdminPage && <GenreMenu/>}
  </div>
}

export default MenuContainer