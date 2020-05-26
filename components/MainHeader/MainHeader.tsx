import { ReactElement } from 'react';
import Image from '../Image';
import Link from 'next/link';


interface MainHeaderProps{
  pageNumber:number;
  onHomeClick:()=>void;
}
// import styles from './MainHeader.module.scss';

export const MainHeader = ({pageNumber , onHomeClick} :MainHeaderProps): ReactElement => {
  const baseClassName = 'main-header';

  return (
    <div className={baseClassName}>
      <Image
        src={'./logo.gif'}
        style={{ border: '1px white solid' , cursor:'pointer' }}
        alt={'hackernews-logo'}
        onClick={onHomeClick}
      />
      <h1 className={`${baseClassName}-title`}>Hacker News</h1>
      <div className="main-header-buttons">
      <Link href={`/?page=${pageNumber + 1}`}>
          <a className={`${baseClassName}-next-page`}>More  >></a>
        </Link>
      </div>
    </div>
  );
};
