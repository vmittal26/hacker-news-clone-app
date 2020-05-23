import { ReactElement } from "react";
import { PostType } from "../../model";

import Image from "../Image";
import { PostItem } from "../PostItem/PostItem";

interface PostsProps {
  postItems: PostType[];
  onUpvote: (postId:number) => void;
}

export const Posts = ({ postItems, onUpvote }: PostsProps): ReactElement => {
  return (
    <div className={"posts"}>
      <table>
        <thead></thead>
        <tbody>
          {postItems
            // .filter((postItem: PostType) => postItem.title)
            .map((postItem: PostType) => {
              return (
                <tr key={postItem.objectID}>
                  <td className={"posts-comments"}>
                    {postItem.num_comments}
                  </td>
                  <td className={"posts-upvotes"}>
                    {postItem.points}
                    <Image
                      src={"./grayarrow.gif"}
                      alt={"hackernews-logo"}
                      onClick={()=>onUpvote(postItem.objectID)}
                    />
                  </td>
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
