import { ReactElement, useEffect, useState } from 'react';
import { NextPageContext } from 'next';
import Error from 'next/error';

import { Posts, AppLayout } from '../components';
import Router from 'next/router';
import { PostResponse, PostType } from '../model';
import { getLocalStorageMap } from '../shared/utils/getLocalStorageMap';
import { DEFAULT_PAGE_SIZE } from '../shared/constants/Constants';
import { getAPIURL } from '../shared/utils/getAPIURL';

interface HackerNewsProps {
  postResonse: PostResponse;
  pageNumber: number;
  isError:boolean
}

const IndexPage = ({ postResonse, pageNumber, isError}: HackerNewsProps): ReactElement => {
  
  let pagePosts:PostType[]  =[];
  if(postResonse!=null){
    pagePosts = postResonse.hits;
  }
  const [posts , setPosts] = useState<PostType[]>([]);

  const onUpvote = (postId:number)=>{
    console.log('on upvote' , postId);
    const post:PostType | undefined = posts.find(post => (post.objectID === postId));
    if(post!=null){
        post.points = post.points+1;
        const pagePostsStorage = getLocalStorageMap();
        pagePostsStorage.set(pageNumber , posts);
        localStorage.pagePostsMap = JSON.stringify(Array.from(pagePostsStorage.entries()));
        setPosts([...posts]);
    }
  }

  const onHidePost = (postId:number)=>{
    console.log('on hidePost' , postId);
    const postsFiltered = posts.filter(post => (post.objectID !== postId));
    const pagePostsStorage = getLocalStorageMap();
    pagePostsStorage.set(pageNumber , postsFiltered);
    localStorage.pagePostsMap = JSON.stringify(Array.from(pagePostsStorage.entries()));
    setPosts([...postsFiltered]);
  }

  useEffect(()=>{
      console.log('bringing data...');
      const pagePostMapFromLocalStorage = getLocalStorageMap();
      const currentPagePosts = pagePostMapFromLocalStorage.get(pageNumber);
      currentPagePosts!=null ?   setPosts([...currentPagePosts]) :   setPosts([...pagePosts]);
  },[pageNumber,pagePosts]);
  
  if(isError){
    return <Error statusCode={503}/>
  }
  return (
    <AppLayout title='Hacker News' pageNumber={pageNumber}>
      <Posts postItems={posts} onUpvote={onUpvote} onHidePost={onHidePost} />
    </AppLayout>
  );
};

IndexPage.getInitialProps = async (context: NextPageContext) => {
  const { query } = context;
  let { page } = query;
  let pageNumber = 0;
  let isError = false;
  let postResonse;
  if (page != null) {
    pageNumber = Number(page);
  }

  try{
    const response = await fetch(getAPIURL(pageNumber, DEFAULT_PAGE_SIZE));
    postResonse = await response.json();
  
  }catch(error){
     console.log(error);
     isError = true;
  }
  return {
    postResonse,
    pageNumber,
    isError
  };
};
export default IndexPage;
