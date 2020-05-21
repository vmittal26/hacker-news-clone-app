import * as React from "react";
import Head from "next/head";

import styles from "./AppLayout.module.scss";
import { MainHeader } from "../MainHeader/MainHeader";

interface Props {
  title?: string;
  className?: string;
}

const AppLayout: React.FunctionComponent<Props> = ({
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

export default AppLayout;
