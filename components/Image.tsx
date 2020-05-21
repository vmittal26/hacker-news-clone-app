import { ReactElement, CSSProperties } from "react";

interface ImageProps{
    src:string;
    style?:CSSProperties;
    alt?:string;
}

const Image =({ src , style , alt }: ImageProps):ReactElement => {
  return <img src={src} style={style} alt={alt} />;
}

export default Image;
