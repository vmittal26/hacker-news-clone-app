import { ReactElement } from "react";
import Image from "../Image";

// import styles from "./MainHeader.module.scss";

export const MainHeader = (): ReactElement => {
  const baseClassName = "main-header";

  return (
    <div className={baseClassName}>
      <Image
        src={"./logo.gif"}
        style={{ border: "1px white solid" }}
        alt={"hackernews-logo"}
      />
      <h1 className={`${baseClassName}-title`}>Hacker News</h1>
    </div>
  );
};
