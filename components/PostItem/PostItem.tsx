import { ReactElement } from 'react';
import { PostType } from '../../model';
import getDomainURL from '../../utils/getDomainURL';
import { format } from 'date-fns';
import { NO_TITLE_EXISTS, DATE_FORMAT } from '../../shared/constants/Constants';

interface PostTypeProps{
  onHidePost:(postId:number)=>void;
  postType:PostType
}

export const PostItem = ({ postType , onHidePost }: PostTypeProps): ReactElement => {
  const { title, author, url: domain, created_at , objectID} = postType;
  let domainURL = getDomainURL(domain);
  return (
    <div className='post-item'>
     <h2 className="post-title item"> {title ? title : NO_TITLE_EXISTS}</h2>
      <span className="post-domain item">{domainURL && `(${domainURL})`}</span>
      <span className="item">by  <strong>{author}</strong></span>
      <span className="item">{`on ${format(
        new Date(created_at),DATE_FORMAT
      )}`}</span>
      <button className="post-hide item" onClick={() => onHidePost(objectID)}>
        <span>[</span>hide<span>]</span>
      </button>
    </div>
  );
};
