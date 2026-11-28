import { createContext, ReactNode, RefObject, useMemo, useRef } from "react";

// Shared DOM refs only. UI state lives in Redux (uiSlice): refs aren't
// serializable, and keeping state out of here means the context value never
// changes, so reading a ref never re-renders a component.
interface CanvasContextProps {
  fileInputRef: RefObject<HTMLInputElement | null>;
  canvasContainerRef: RefObject<HTMLDivElement | null>;
  textAreaRef: RefObject<HTMLTextAreaElement | null>;
  textAreaDivCloneRef: RefObject<HTMLDivElement | null>;
  addTextButtonRef: RefObject<HTMLButtonElement | null>;
  addImageButtonRef: RefObject<HTMLButtonElement | null>;
}

const CanvasContext = createContext<CanvasContextProps>({
  fileInputRef: { current: null } as RefObject<HTMLInputElement | null>,
  canvasContainerRef: { current: null } as RefObject<HTMLDivElement | null>,
  textAreaRef: { current: null } as RefObject<HTMLTextAreaElement | null>,
  textAreaDivCloneRef: { current: null } as RefObject<HTMLDivElement | null>,
  addTextButtonRef: { current: null } as RefObject<HTMLButtonElement | null>,
  addImageButtonRef: { current: null } as RefObject<HTMLButtonElement | null>,
});

interface CanvasContextProviderProps {
  children: ReactNode;
}

export function CanvasContextProvider({
  children,
}: CanvasContextProviderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const textAreaDivCloneRef = useRef<HTMLDivElement>(null);
  const addTextButtonRef = useRef<HTMLButtonElement>(null);
  const addImageButtonRef = useRef<HTMLButtonElement>(null);

  const context = useMemo(
    () => ({
      fileInputRef,
      canvasContainerRef,
      textAreaRef,
      textAreaDivCloneRef,
      addTextButtonRef,
      addImageButtonRef,
    }),
    [],
  );

  return (
    <CanvasContext.Provider value={context}>{children}</CanvasContext.Provider>
  );
}

export default CanvasContext;
