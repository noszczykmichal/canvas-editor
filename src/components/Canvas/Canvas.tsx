import { useEffect, useContext, ChangeEvent } from "react";

import useFocusBack from "@hooks/useFocusBack";
import CanvasContext from "@store/context";
import ImageBox from "@components/Canvas/ImageBox/ImageBox";
import TextArea from "@components/Canvas/TextArea/TextArea";
import "./Canvas.scss";

const Canvas = () => {
  const {
    fileInputRef,
    canvasContainerRef,
    backgroundImage,
    setBackgroundImage,
    setIsBackdropOpen,
    isTextFieldAdded,
    setImageBoxBackground,
    imageBoxBackground,
  } = useContext(CanvasContext);

  const { handleFocusBack, addWindowListener } = useFocusBack();

  /* when the input is clicked programmatically, an event listener is added to the window object, as this is the only way to 
  determine if the user aborted adding the image; thanks to this, it is possible to close the overlay when the window object 
  regains focus  */

  const handleInputFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleFocusBack();
    const file = event.target.files?.[0];
    const clickSource = fileInputRef.current?.getAttribute("data-source");

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
    if (fileInputRef.current) {
      fileInputRef.current?.addEventListener("focusout", () =>
        setIsBackdropOpen(false),
      );
    }
  }, [setIsBackdropOpen, fileInputRef]);

  return (
    <>
      <input
        type="file"
        accept="image/*"
        className="file-input"
        ref={fileInputRef}
        onChange={handleInputFileChange}
        onClick={addWindowListener}
      />
      <div className="canvas-container" ref={canvasContainerRef}>
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
