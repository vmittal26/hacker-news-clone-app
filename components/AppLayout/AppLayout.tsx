import Head from "next/head";
import * as React from "react";
import { MainHeader } from "../MainHeader/MainHeader";

import styles from "./AppLayout.module.scss";

interface Props {
  title?: string;
  className?: string;
}

export const AppLayout: React.FunctionComponent<Props> = ({
  children,
  title = "Hacker News",
  className,
}) => {
  return (
    <div className={`${styles["hacker-news-list"]} ${className}`}>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <MainHeader />
      {children}
      <footer></footer>
    </div>
  );
};
