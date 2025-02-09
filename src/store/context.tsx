import {
  createContext,
  FC,
  ReactNode,
  useState,
  RefObject,
  useMemo,
  useRef,
} from "react";

interface CanvasContextProps {
  fileInputRef: RefObject<HTMLInputElement | null>;
  canvasContainerRef: RefObject<HTMLDivElement | null>;
  textAreaRef: RefObject<HTMLTextAreaElement | null>;
  textAreaDivCloneRef: RefObject<HTMLDivElement | null>;
  backgroundImage: string;
  isBackdropOpen: boolean;
  isModalOpen: boolean;
  isTextFieldAdded: boolean;
  imageBoxBackground: string;
  textColor: string;
}

interface CanvasContextActions {
  setBackgroundImage: (url: string) => void;
  setIsBackdropOpen: (val: boolean) => void;
  setIsModalOpen: (val: boolean) => void;
  setIsTextFieldAdded: (val: boolean) => void;
  setImageBoxBackground: (val: string) => void;
  setTextColor: (val: string) => void;
}

const CanvasContext = createContext<CanvasContextProps & CanvasContextActions>({
  fileInputRef: { current: null } as RefObject<HTMLInputElement | null>,
  canvasContainerRef: { current: null } as RefObject<HTMLDivElement | null>,
  textAreaRef: { current: null } as RefObject<HTMLTextAreaElement | null>,
  textAreaDivCloneRef: { current: null } as RefObject<HTMLDivElement | null>,
  backgroundImage: "",
  isBackdropOpen: false,
  isModalOpen: false,
  isTextFieldAdded: false,
  imageBoxBackground: "",
  textColor: "#353535",
  setBackgroundImage: (_txt: string) => {},
  setIsBackdropOpen: () => {},
  setIsModalOpen: () => {},
  setIsTextFieldAdded: () => {},
  setImageBoxBackground: () => {},
  setTextColor: (_val: string) => {},
});

interface CanvasContextProviderProps {
  children: ReactNode;
}

export const CanvasContextProvider: FC<CanvasContextProviderProps> = ({
  children,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const textAreaDivCloneRef = useRef<HTMLDivElement>(null);
  const [backgroundImage, setBackgroundImage] = useState("");
  const [isBackdropOpen, setIsBackdropOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTextFieldAdded, setIsTextFieldAdded] = useState(false);
  const [imageBoxBackground, setImageBoxBackground] = useState("");
  const [textColor, setTextColor] = useState("#353535");

  const context = useMemo(
    () => ({
      fileInputRef,
      canvasContainerRef,
      textAreaRef,
      textAreaDivCloneRef,
      backgroundImage,
      isBackdropOpen,
      isModalOpen,
      isTextFieldAdded,
      imageBoxBackground,
      textColor,
      setBackgroundImage,
      setIsBackdropOpen,
      setIsModalOpen,
      setIsTextFieldAdded,
      setImageBoxBackground,
      setTextColor,
    }),
    [
      backgroundImage,
      canvasContainerRef,
      fileInputRef,
      imageBoxBackground,
      isBackdropOpen,
      isModalOpen,
      isTextFieldAdded,
      textColor,
    ],
  );

  return (
    <CanvasContext.Provider value={context}>{children}</CanvasContext.Provider>
  );
};

export default CanvasContext;
