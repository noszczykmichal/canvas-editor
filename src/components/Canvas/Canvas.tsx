import { useRef, useEffect, useState, useContext, ChangeEvent } from "react";

import CanvasContext from "../../store/context";
import "./Canvas.scss";

const Canvas = () => {
  const {
    setFileInputRef,
    setCanvasContainerRef,
    backgroundImage,
    setBackgroundImage,
    setIsBackdropOpen,
  } = useContext(CanvasContext);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageBoxRef = useRef<HTMLDivElement>(null);
  const imageBoxResizerRef = useRef<HTMLDivElement>(null);
  const [isClicked, setIsClicked] = useState(false);
  const [coordinates, setCoordinates] = useState({
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
  });

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
    // console.log(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setBackgroundImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    inputRef.current?.addEventListener("focusout", () =>
      setIsBackdropOpen(false)
    );
    setCanvasContainerRef(containerRef);
    setFileInputRef(inputRef);

    if (!containerRef.current || !imageBoxRef.current) {
      return;
    }

    const container = containerRef.current;
    const imageBox = imageBoxRef.current;

    const onMouseDownHandler = (e: MouseEvent) => {
      console.log(imageBoxResizerRef);

      setIsClicked(true);

      setCoordinates((prevState) => ({
        ...prevState,
        startX: e.clientX,
        startY: e.clientY,
      }));

      console.log("clicked");
    };

    const onMouseUpHandler = (_e: MouseEvent) => {
      setIsClicked(false);
      setCoordinates((prevState) => ({
        ...prevState,
        lastX: imageBox.offsetLeft,
        lastY: imageBox.offsetTop,
      }));
    };

    const onMouseMoveHandler = (e: MouseEvent) => {
      if (!isClicked) {
        return;
      }

      const nextX = e.clientX - coordinates.startX + coordinates.lastX;
      const nextY = e.clientY - coordinates.startY + coordinates.lastY;

      if (imageBoxRef.current) {
        imageBoxRef.current.style.top = `${nextY}px`;
        imageBoxRef.current.style.left = `${nextX}px`;
      }
    };

    imageBox.addEventListener("mousedown", onMouseDownHandler);
    imageBox.addEventListener("mouseup", onMouseUpHandler);
    container.addEventListener("mousemove", onMouseMoveHandler);
    container.addEventListener("mouseleave", onMouseUpHandler);

    const cleanUp = () => {
      imageBox.removeEventListener("mousedown", onMouseDownHandler);
      imageBox.removeEventListener("mouseup", onMouseUpHandler);
      container.removeEventListener("mousemove", onMouseMoveHandler);
      container.removeEventListener("mouseleave", onMouseUpHandler);
    };

    return () => cleanUp();
  }, [
    coordinates,
    isClicked,
    setIsClicked,
    setFileInputRef,
    setCanvasContainerRef,
    setIsBackdropOpen,
  ]);

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
      <div className="canvas-container" ref={containerRef} style={{}}>
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
        <div className="image-box" ref={imageBoxRef}>
          <div className="resizer" ref={imageBoxResizerRef} />
        </div>
      </div>
    </>
  );
};

export default Canvas;
