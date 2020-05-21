import { NextPageContext } from "next";
import Link from "next/link";
import { ReactElement } from "react";
import { Posts } from "../components";
import AppLayout from "../components/AppLayout/AppLayout";
import { PostResponse } from "../model";

interface HackerNewsProps {
  postResonse: PostResponse;
  pageNumber: number;
}

const IndexPage = ({ postResonse, pageNumber, }: HackerNewsProps): ReactElement => {
  const { hits } = postResonse;
  return (
    <AppLayout title="Hacker News">
      <Posts postItems={hits} />
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
