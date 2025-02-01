import { createContext, FC, ReactNode, useState, RefObject } from "react";

interface CanvasContextProps {
  fileInputRef: RefObject<HTMLInputElement> | null;
  canvasContainerRef: RefObject<HTMLDivElement> | null;
  backgroundImage: string;
  isBackdropOpen: boolean;
  isModalOpen: boolean;
  isTextFieldAdded: boolean;
  isImageBoxAdded: boolean;
}

interface CanvasContextActions {
  setFileInputRef: (ref: RefObject<HTMLInputElement>) => void;
  setCanvasContainerRef: (ref: RefObject<HTMLDivElement>) => void;
  setBackgroundImage: (url: string) => void;
  setIsBackdropOpen: (val: boolean) => void;
  setIsModalOpen: (val: boolean) => void;
  setIsTextFieldAdded: (val: boolean) => void;
  setIsImageBoxAdded: (val: boolean) => void;
}

const CanvasContext = createContext<CanvasContextProps & CanvasContextActions>({
  fileInputRef: null,
  canvasContainerRef: null,
  backgroundImage: "",
  isBackdropOpen: false,
  isModalOpen: false,
  isTextFieldAdded: false,
  isImageBoxAdded: false,
  setFileInputRef: (_ref: RefObject<HTMLInputElement>) => {},
  setCanvasContainerRef: (_ref: RefObject<HTMLDivElement>) => {},
  setBackgroundImage: (_txt: string) => {},
  setIsBackdropOpen: () => {},
  setIsModalOpen: () => {},
  setIsTextFieldAdded: () => {},
  setIsImageBoxAdded: () => {},
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
  const [backgroundImage, setBackgroundImage] = useState("");
  const [isBackdropOpen, setIsBackdropOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTextFieldAdded, setIsTextFieldAdded] = useState(false);
  const [isImageBoxAdded, setIsImageBoxAdded] = useState(false);

  const context = {
    fileInputRef,
    canvasContainerRef,
    backgroundImage,
    isBackdropOpen,
    isModalOpen,
    isTextFieldAdded,
    isImageBoxAdded,
    setFileInputRef,
    setCanvasContainerRef,
    setBackgroundImage,
    setIsBackdropOpen,
    setIsModalOpen,
    setIsTextFieldAdded,
    setIsImageBoxAdded,
  };

  return (
    <CanvasContext.Provider value={context}>{children}</CanvasContext.Provider>
  );
};

export default CanvasContext;
