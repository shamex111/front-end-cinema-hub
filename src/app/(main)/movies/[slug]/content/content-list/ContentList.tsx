import { IContentList } from '../content.interface';
import { FC, Fragment } from 'react';
import styles from './ContentList.module.scss';
import Link from 'next/link';
const ContentList: FC<IContentList> = ({ links, name }) => {
  return <div className={styles.list}>
    <div className={styles.name}>{name}</div>
    <div className={styles.link}>
        {
            links.slice(0,3).map((link,idx) => (
                <Fragment key={idx}>
                    <Link href={link.link} className={styles.link}>
                    {link.title}
                    </Link>
                    {idx+1 !== links.length ? ', ' : ''}
                </Fragment>
            ))
        }
    </div>
  </div>;
};

export default ContentList;
