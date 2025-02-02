import { useRef, useEffect } from "react";

import ElementWrapper from "../ElementWrapper/ElementWrapper";

const TextArea = () => {
  const textAreaRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    textAreaRef.current?.focus();
  }, []);

  return <ElementWrapper contentType="text" ref={textAreaRef} />;
};

export default TextArea;
