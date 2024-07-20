import Button from '../../form-elements/button/Button';
import Image from 'next/image';
import { FC } from 'react';

import styles from '../Profile.module.scss';

interface IProfileUserAvatar {
  logout: (() => void) | null;
  user: any;
  IsShort: boolean;
}

const ProfileUserAvatar: FC<IProfileUserAvatar> = ({
  logout,
  user,
  IsShort
}) => {
  return (
    <div>
      <div className={styles.leftPart}>
        <div className={styles.avatar}>
          <Image
            src={user.avatarPath}
            alt={user.name}
            width={183}
            height={183}
            className="rounded-2xl mt-5"
          />
        </div>
        {(!IsShort  &&  logout) &&
          <Button
            className={styles.button}
            variant="outline"
            onClick={() => logout()}
          >
            Выйти
          </Button> 
        }
      </div>
    </div>
  );
};

export default ProfileUserAvatar;
