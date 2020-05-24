import { ReactElement } from 'react';
import { PostType } from '../../model';
import getDomainURL from '../../utils/getDomainURL';
import { format } from 'date-fns';

interface PostTypeProps{
  onHidePost:(postId:number)=>void;
  postType:PostType
}

export const PostItem = ({ postType , onHidePost }: PostTypeProps): ReactElement => {
  const { title, author, url: domain, created_at , objectID} = postType;
  let domainURL = getDomainURL(domain);
  const baseClass = 'post-item';
  const itemClass = 'item';

  return (
    <div className={baseClass}>
      <div className={`${baseClass}-section-1`}>
        <h4 className={`${baseClass}-title ${itemClass}`}>
          {title ? title : ''}
        </h4>
      </div>
      <div className={`${baseClass}-section-2`}>
        <div className={`${baseClass}-domain ${itemClass}`}>
          {domainURL && `(${domainURL})`}
        </div>
        <div className={`${baseClass}-username ${itemClass}`}>
          <span>by</span> {<strong>{author}</strong>}
        </div>
        <div className={`${baseClass}-date ${itemClass}`}>{`on ${format(
          new Date(created_at),
          'dd-MMM-yyyy'
        )}`}</div>
        <button className={`${baseClass}-hide ${itemClass}`} onClick={()=>onHidePost(objectID)}>
          <span>[</span>hide<span>]</span>
        </button>
      </div>
    </div>
  );
};
