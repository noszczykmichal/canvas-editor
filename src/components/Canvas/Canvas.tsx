import { useRef, useEffect, useContext, ChangeEvent } from "react";

import CanvasContext from "../../store/context";
import ImageBox from "./ImageBox/ImageBox";
import TextArea from "./TextArea/TextArea";
import "./Canvas.scss";

const Canvas = () => {
  const {
    setFileInputRef,
    setCanvasContainerRef,
    backgroundImage,
    setBackgroundImage,
    setIsBackdropOpen,
    isTextFieldAdded,
    setImageBoxBackground,
    imageBoxBackground,
  } = useContext(CanvasContext);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageBoxRef = useRef<HTMLImageElement>(null);

  /* when the input is clicked programmatically, an event listener is added to the window object, as this is the only way to 
  determine if the user aborted adding the image; thanks to this, it is possible to close the overlay when the window object 
  regains focus  */

  const handleFocusBack = () => {
    setIsBackdropOpen(false);
    window.removeEventListener("focus", handleFocusBack);
  };

  const onInputClick = () => {
    window.addEventListener("focus", handleFocusBack);
  };

  const handleInputFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsBackdropOpen(false);
    window.removeEventListener("focus", handleFocusBack);
    const file = event.target.files?.[0];
    const clickSource = inputRef.current?.getAttribute("data-source");
    console.log(clickSource);

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (clickSource === "imageBox") {
          setImageBoxBackground(e.target?.result as string);
          return;
        }

        setBackgroundImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current?.addEventListener("focusout", () =>
        setIsBackdropOpen(false)
      );
    }
    setCanvasContainerRef(containerRef);
    setFileInputRef(inputRef);

    if (!containerRef.current || !imageBoxRef.current) {
      return;
    }
  }, [setCanvasContainerRef, setFileInputRef, setIsBackdropOpen]);

  return (
    <>
      <input
        type="file"
        accept="image/*"
        className="file-input"
        ref={inputRef}
        onChange={handleInputFileChange}
        onClick={onInputClick}
      />
      <div className="canvas-container" ref={containerRef}>
        {isTextFieldAdded && <div className="text-field-background" />}
        {isTextFieldAdded && <TextArea />}
        {backgroundImage && (
          <div
            className="custom-background"
            style={{
              backgroundImage: backgroundImage
                ? `url(${backgroundImage})`
                : "none",
            }}
          />
        )}

        {imageBoxBackground && <ImageBox />}
      </div>
    </>
  );
};

export default Canvas;
