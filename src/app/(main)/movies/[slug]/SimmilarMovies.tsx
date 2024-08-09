import Gallery from '@/components/ui/gallery/Gallery'
import { IGalleryItem } from '@/components/ui/gallery/gallery.interface'
import Heading from '@/components/ui/heading/Heading'
import { FC } from 'react'

interface ISimmilarMovies {
    simmilarMovies: IGalleryItem[]
}

const SimmilarMovies: FC<ISimmilarMovies> = ({simmilarMovies}) => {
  return simmilarMovies.length ? <div className='mt-8'>
    <Heading className='mb-3'>Похожие фильмы</Heading>
    <Gallery items={simmilarMovies}/>
  </div> : null
}

export default SimmilarMovies