import { ReactElement } from "react";
import { PostType } from "../../model";
import getDomainURL from "../../utils/getDomainURL";
import { format } from "date-fns";

import styles from "./PostItem.module.scss";

export const PostItem = (props: PostType): ReactElement => {
  const { title, userName, url: domain, created_at } = props;

  let domainURL = getDomainURL(domain);
  return (
    <div className={styles["post-item"]}>
      <h4 className={styles["post-item-title"]}>{title}</h4>
      <div className={styles["post-item-domain"]}>
        {domainURL && `(${domainURL})`}
      </div>
      <div className={styles["post-item-username"]}>
        <span>by</span> {<strong>{userName}</strong>}
      </div>
      <div className={styles["post-item-date"]}>{`on ${format(
        new Date(created_at),
        "dd-MMM-yyyy"
      )}`}</div>
      <button className={styles["post-item-hide"]}>hide</button>
    </div>
  );
};
