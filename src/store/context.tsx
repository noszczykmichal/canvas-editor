import { createContext, FC, ReactNode, useState, RefObject } from "react";

interface CanvasContextProps {
  fileInputRef: RefObject<HTMLInputElement> | null;
  canvasContainerRef: RefObject<HTMLDivElement> | null;
  backgroundImage: string;
}

interface CanvasContextActions {
  setFileInputRef: (ref: RefObject<HTMLInputElement>) => void;
  setCanvasContainerRef: (ref: RefObject<HTMLInputElement>) => void;
  setBackgroundImage: (txt: string) => void;
}

const CanvasContext = createContext<CanvasContextProps & CanvasContextActions>({
  fileInputRef: null,
  canvasContainerRef: null,
  backgroundImage: "",
  setFileInputRef: (_ref: RefObject<HTMLInputElement>) => {},
  setCanvasContainerRef: (_ref: RefObject<HTMLDivElement>) => {},
  setBackgroundImage: (_txt: string) => {},
});

interface CanvasContextProviderProps {
  children: ReactNode;
}

export const CanvasContextProvider: FC<CanvasContextProviderProps> = ({
  children,
}) => {
  const [fileInputRef, setFileInputRef] =
    useState<RefObject<HTMLInputElement> | null>(null);
  const [canvasContainerRef, setCanvasContainerRef] =
    useState<RefObject<HTMLDivElement> | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<string>("");

  const context = {
    fileInputRef,
    canvasContainerRef,
    backgroundImage,
    setFileInputRef,
    setCanvasContainerRef,
    setBackgroundImage,
  };

  return (
    <CanvasContext.Provider value={context}>{children}</CanvasContext.Provider>
  );
};

export default CanvasContext;
