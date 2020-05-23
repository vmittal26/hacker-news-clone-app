import { ReactElement, useEffect, useState } from "react";
import Link from "next/link";
import { NextPageContext } from "next";

import { Posts, AppLayout } from "../components";
import { PostResponse, PostType } from "../model";

interface HackerNewsProps {
  postResonse: PostResponse;
  pageNumber: number;
}
const pagePostsMap = new Map<number,PostType[]>();

const IndexPage = ({ postResonse, pageNumber, }: HackerNewsProps): ReactElement => {
  const { hits : pagePosts } = postResonse;
  const [posts , setPosts] = useState<PostType[]>([]);

  const onUpvote = (postId:number)=>{
    console.log('on upvote' , postId);
    const post:PostType | undefined = posts.find(post => (post.objectID === postId));
    if(post!=null){
      post.points = post.points+1;
      pagePostsMap.set(pageNumber , posts);
      setPosts([...posts]);
    }
  }

  useEffect(()=>{
      console.log('bringing data...');
      const currentPagePosts = pagePostsMap.get(pageNumber);
      currentPagePosts!=null ?   setPosts([...currentPagePosts]) :   setPosts([...pagePosts]);
  },[pageNumber,pagePosts]);
  
  return (
    <AppLayout title="Hacker News">
      <Posts postItems={posts} onUpvote={onUpvote} />
      <Link href={`/?page=${pageNumber + 1}`}>
        <a>More</a>
      </Link>
    </AppLayout>
  );
};

IndexPage.getInitialProps = async (context: NextPageContext) => {
  const { query } = context;
  let { page } = query;
  let pageNumber = 0;

  if (page != null) {
    pageNumber = Number(page);
  }

  const response = await fetch(
    `https://hn.algolia.com/api/v1/search?page=${pageNumber}&hitsPerPage=20`
  );
  const postResonse = await response.json();

  return {
    postResonse,
    pageNumber,
  };
};
export default IndexPage;
