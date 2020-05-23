import { ReactElement, useEffect, useState } from "react";
import { NextPageContext } from "next";

import { Posts, AppLayout } from "../components";
import { PostResponse, PostType } from "../model";

const getPagePostsMap = ():Map<number,PostType[]>=> {
 if(localStorage.getItem('pagePostsMap')){
   console.log('data exists in local storage');
   return new Map(JSON.parse(localStorage.pagePostsMap));
 } else{
   console.log('data does not exist local storage');
   return new Map<number,PostType[]>();
  }
}

interface HackerNewsProps {
  postResonse: PostResponse;
  pageNumber: number;
}

const IndexPage = ({ postResonse, pageNumber, }: HackerNewsProps): ReactElement => {
  const { hits : pagePosts } = postResonse;
  const [posts , setPosts] = useState<PostType[]>([]);

  const onUpvote = (postId:number)=>{
    console.log('on upvote' , postId);
    const post:PostType | undefined = posts.find(post => (post.objectID === postId));
    if(post!=null){
        post.points = post.points+1;
        const pagePostsStorage = getPagePostsMap();
        pagePostsStorage.set(pageNumber , posts);
        localStorage.pagePostsMap = JSON.stringify(Array.from(pagePostsStorage.entries()));
        setPosts([...posts]);
    }
  }

  useEffect(()=>{
      console.log('bringing data...');
      getPagePostsMap();
      const pagePostMapFromLocalStorage = getPagePostsMap();
      const currentPagePosts = pagePostMapFromLocalStorage.get(pageNumber);
      currentPagePosts!=null ?   setPosts([...currentPagePosts]) :   setPosts([...pagePosts]);
  },[pageNumber,pagePosts]);
  
  return (
    <AppLayout title="Hacker News" pageNumber={pageNumber}>
      <Posts postItems={posts} onUpvote={onUpvote} />
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
    `https://hn.algolia.com/api/v1/search?page=${pageNumber}&hitsPerPage=40`
  );
  const postResonse = await response.json();

  return {
    postResonse,
    pageNumber,
  };
};
export default IndexPage;
