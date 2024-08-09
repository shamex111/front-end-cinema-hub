import { FC } from 'react'
import { IGalleryItem } from './gallery.interface'
import styles from './Gallery.module.scss' 
import GalleryItem from './GalleryItem'
interface IGallery {
    items:IGalleryItem[] 
}

const Gallery: FC<IGallery> = ({items}) => {
  return <div className={styles.gallery}>
    {items.map(item => (
        <GalleryItem key={item.link} item={item} variant={item.isGenre ? 'horizontal' : 'vertical'}/>
    ))}
  </div>
}

export default Gallery