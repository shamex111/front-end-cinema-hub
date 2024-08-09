import { FC } from 'react';
import cn from 'clsx'
import styles from './SlideArrow.module.scss'
import { Icon } from '../../Icon';
interface ISlideArrow {
  variant: 'left' | 'right';
  clickHandler: () => void;
}

const SlideArrow: FC<ISlideArrow> = ({variant,clickHandler}) => {
  const isLeft = variant === 'left'
    return <button onClick={clickHandler} className={cn(styles.arrow, {
        [styles.left]:isLeft,
        [styles.right]:!isLeft
    })}>
        <Icon name={isLeft ? 'LuChevronLeft' : 'LuChevronRight'}  className={styles.icon}/>
    </button>;
};

export default SlideArrow;
