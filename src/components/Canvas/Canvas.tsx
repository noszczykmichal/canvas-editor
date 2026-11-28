import { useEffect, useContext, ChangeEvent } from "react";

import useFocusBack from "@/hooks/useFocusBack";
import CanvasContext from "@/store/context";
import ImageBox from "@/components/Canvas/ImageBox/ImageBox";
import TextArea from "@/components/Canvas/TextArea/TextArea";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { uiSliceActions } from "@/store/uiSlice";
import "@/components/Canvas/Canvas.scss";

export default function Canvas() {
  const { fileInputRef, canvasContainerRef } = useContext(CanvasContext);
  const { setBackgroundImage, setImageBoxBackground, setIsBackdropOpen } =
    uiSliceActions;
  const isTextFieldAdded = useAppSelector((state) => state.ui.isTextFieldAdded);
  const backgroundImage = useAppSelector((state) => state.ui.backgroundImage);
  const imageBoxBackground = useAppSelector(
    (state) => state.ui.imageBoxBackground,
  );
  const dispatch = useAppDispatch();

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
          dispatch(setImageBoxBackground(e.target?.result as string));
          return;
        }

        dispatch(setBackgroundImage(e.target?.result as string));
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (fileInputRef.current) {
      fileInputRef.current?.addEventListener("focusout", () =>
        dispatch(setIsBackdropOpen(false)),
      );
    }
  }, [dispatch, setIsBackdropOpen, fileInputRef]);

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
}
