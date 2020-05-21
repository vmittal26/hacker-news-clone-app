import { ReactElement } from "react";
import { PostType } from "../../model";
import { PostItem } from "../PostItem/PostItem";

import styles from './Posts.module.scss';

interface PostsProps {
  postItems: PostType[];
}

export const Posts = ({ postItems }: PostsProps): ReactElement => {
  return (
    <div className={styles.posts}>
      <table>
        <thead></thead>
        <tbody>
          {postItems
            .filter((postItem: PostType) => postItem.title)
            .map((postItem: PostType) => {
              return (
                <tr key={postItem.objectID}>
                  <td className={styles['posts-comments']}>{postItem.num_comments}</td>
                  <td className={styles["posts-upvotes"]}>{postItem.points}</td>
                  <td>
                    <PostItem {...postItem} />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
