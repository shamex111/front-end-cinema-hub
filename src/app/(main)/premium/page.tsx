import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import Premium from './Premium'

export const metadata: Metadata = {
    title: 'Премиум подписка',
}

export default function PremiumPage() {
    return <Premium />
}
