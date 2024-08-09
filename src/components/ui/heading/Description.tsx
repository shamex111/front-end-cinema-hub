import cn from 'clsx';
import parse from 'html-react-parser';
import { FC } from 'react';
import { RiInfraredThermometerFill } from 'react-icons/ri';

interface IDescription {
  text: string;
  className?: string;
}

const Description: FC<IDescription> = ({ text, className }) => {
  return <div className={cn('text-white/60', className)}>{parse(text)}</div>;
};

export default Description;
