import { FC } from 'react';

import styles from './Menu.module.scss';
import { IMenu } from './menu.interface';
import MenuItem from './MenuItem';

const Menu: FC<{ menu: IMenu }> = ({ menu: { items, title } }) => {
  return (
    <div className={styles.menu}>
      <div className={styles.heading}>{title}</div>
      <div className={styles.items}>
        {items.length ? (
          items.map(item => <MenuItem key={item.link} item={item} />)
        ) : (
          <div>Элементы не найдены</div>
        )}
      </div>
    </div>
  );
};

export default Menu;
