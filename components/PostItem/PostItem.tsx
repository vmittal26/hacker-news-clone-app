import { ReactElement } from "react";
import { PostType } from "../../model";
import getDomainURL from "../../utils/getDomainURL";
import { format } from "date-fns";

// import styles from "./PostItem.module.scss";

export const PostItem = (props: PostType): ReactElement => {
  const { title, author, url: domain, created_at } = props;

  let domainURL = getDomainURL(domain);
  const baseClass = "post-item";
  return (
    <div className={baseClass}>
      <h4 className={`${baseClass}-title`}>{title ? title : ''}</h4>
      <div className={`${baseClass}-domain`}>
        {domainURL && `(${domainURL})`}
      </div>
      <div className={`${baseClass}-username`}>
        <span>by</span> {<strong>{author}</strong>}
      </div>
      <div className={`${baseClass}-date`}>{`on ${format(
        new Date(created_at),
        "dd-MMM-yyyy"
      )}`}</div>
      <button className={`${baseClass}-hide`}>hide</button>
    </div>
  );
};
