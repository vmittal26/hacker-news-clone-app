import { ReactElement } from 'react';
import { PostType } from '../../model';

import Image from '../Image';
import { PostItem } from '../PostItem/PostItem';

interface PostsProps {
  postItems: PostType[];
  onHidePost:(postId: number)=>void;
  onUpvote: (postId: number) => void;
}

export const Posts = ({ postItems, onUpvote , onHidePost }: PostsProps): ReactElement => {
  return (
    <div className={'posts'}>
      <table>
        <thead></thead>
        <tbody>
          {postItems
            // .filter((postItem: PostType) => postItem.title)
            .map((postItem: PostType) => {
              const { num_comments, objectID, points } = postItem;
              return (
                <tr key={objectID}>
                  <td>
                    <span className='posts-comments'>{num_comments}</span>
                  </td>
                  <td>
                    <div className='posts-upvotes'>
                      <span>{points}</span>
                      <Image
                        src={'./grayarrow.gif'}
                        alt={'hackernews-logo'}
                        onClick={() => onUpvote(objectID)}
                      />
                    </div>
                  </td>
                  <td>
                    <PostItem postType ={postItem} onHidePost={onHidePost}/>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
