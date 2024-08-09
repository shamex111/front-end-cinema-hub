export interface IGalleryItem {
  poster: string;
  name: string;
  link: string;
  content?: {
    title: string;
    subTitle?: string;
  };
  isGenre?:boolean
}


export interface IGalleryItemProps {
  item: IGalleryItem;
  variant: 'vertical' | 'horizontal';
}
