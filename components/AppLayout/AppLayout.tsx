import * as React from "react";
import Head from "next/head";
import Link from "next/link";

import { MainHeader } from "../MainHeader/MainHeader";

// import styles from "./AppLayout.module.scss";

interface Props {
  title?: string;
  className?: string;
  pageNumber: number;
}

export const AppLayout: React.FunctionComponent<Props> = ({
  children,
  title = "Hacker News",
  className,
  pageNumber = 0,
}) => {

  const baseClassName = "app-layout";
  return (
    <div className={`${baseClassName} ${className}`}>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <MainHeader />
      {children}
      <footer>
        <Link href={`/?page=${pageNumber + 1}`}>
          <a className={`${baseClassName}-next-page`}>More</a>
        </Link>
      </footer>
    </div>
  );
};
