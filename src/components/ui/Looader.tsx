import { FC } from "react";
import { LuLoader } from 'react-icons/lu';
import cn from 'clsx';

interface ILoader {
    size?: string; 
} 

const Loader: FC<ILoader> = ({ size = 'size-8' }) => {
    return <LuLoader className={cn('text-slate-400 animate-spin', size)} />;
};

export default Loader;
