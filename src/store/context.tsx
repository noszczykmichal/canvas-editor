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
  addTextButtonRef: RefObject<HTMLButtonElement | null>;
  addImageButtonRef: RefObject<HTMLButtonElement | null>;
  isBackdropOpen: boolean;
  isModalOpen: boolean;
  isTextFieldAdded: boolean;
}

interface CanvasContextActions {
  setIsBackdropOpen: (val: boolean) => void;
  setIsModalOpen: (val: boolean) => void;
  setIsTextFieldAdded: (val: boolean) => void;
}

const CanvasContext = createContext<CanvasContextProps & CanvasContextActions>({
  fileInputRef: { current: null } as RefObject<HTMLInputElement | null>,
  canvasContainerRef: { current: null } as RefObject<HTMLDivElement | null>,
  textAreaRef: { current: null } as RefObject<HTMLTextAreaElement | null>,
  textAreaDivCloneRef: { current: null } as RefObject<HTMLDivElement | null>,
  addTextButtonRef: { current: null } as RefObject<HTMLButtonElement | null>,
  addImageButtonRef: { current: null } as RefObject<HTMLButtonElement | null>,
  isBackdropOpen: false,
  isModalOpen: false,
  isTextFieldAdded: false,
  setIsBackdropOpen: () => {},
  setIsModalOpen: () => {},
  setIsTextFieldAdded: () => {},
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
  const addTextButtonRef = useRef<HTMLButtonElement>(null);
  const addImageButtonRef = useRef<HTMLButtonElement>(null);
  const [isBackdropOpen, setIsBackdropOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTextFieldAdded, setIsTextFieldAdded] = useState(false);

  const context = useMemo(
    () => ({
      fileInputRef,
      canvasContainerRef,
      textAreaRef,
      textAreaDivCloneRef,
      addTextButtonRef,
      addImageButtonRef,
      isBackdropOpen,
      isModalOpen,
      isTextFieldAdded,
      setIsBackdropOpen,
      setIsModalOpen,
      setIsTextFieldAdded,
    }),
    [
      canvasContainerRef,
      fileInputRef,
      isBackdropOpen,
      isModalOpen,
      isTextFieldAdded,
    ],
  );

  return (
    <CanvasContext.Provider value={context}>{children}</CanvasContext.Provider>
  );
};

export default CanvasContext;
