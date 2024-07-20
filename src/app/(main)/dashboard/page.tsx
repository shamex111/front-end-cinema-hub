import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import Profile from '@/components/ui/profile/Profile'

export const metadata: Metadata = {
    title: 'Личный кабинет ',
    ...NO_INDEX_PAGE
}

export default function DashboardPage() {
    return <Profile/>
}
