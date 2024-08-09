import cn from 'clsx';
import { FC } from 'react';
import * as Icons from 'react-icons/lu';

export type TypeIconName = keyof typeof Icons;
export interface IIcon {
  name: TypeIconName;
  className?: string;
  color?: string;
}

export const Icon: FC<IIcon> = ({ name, className,color }) => {
  const IconComponent = Icons[name];

  return <IconComponent className={cn('className', className)} color={color} />;
};
