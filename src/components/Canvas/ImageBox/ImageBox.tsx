import { useEffect, useRef } from "react";

import ElementWrapper from "../ElementWrapper/ElementWrapper";
import "./ImageBox.scss";

const ImageBox = () => {
  const imageBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    imageBoxRef.current!.focus();
  }, []);

  return <ElementWrapper ref={imageBoxRef} contentType="image" />;
};

export default ImageBox;
