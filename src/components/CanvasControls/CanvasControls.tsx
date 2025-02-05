import { useContext } from "react";
import html2canvas from "html2canvas";

import Logo from "../../icons/Logo";
import ResetButton from "./ResetButton/ResetButton";
import Controls from "./Controls/Controls";
import CanvasContext from "../../store/context";
import useFocusBack from "../../hooks/useFocusBack";
import "./CanvasControls.scss";

const CanvasControls = () => {
  const {
    isTextFieldAdded,
    imageBoxBackground,
    backgroundImage,
    canvasContainerRef,
    textAreaRef,
    textAreaDivCloneRef,
  } = useContext(CanvasContext);
  const isExportDisabled = !(
    isTextFieldAdded ||
    !!imageBoxBackground ||
    !!backgroundImage
  );
  const { addWindowListener, handleFocusBack } = useFocusBack();

  const saveImage = async (blob: Blob) => {
    try {
      /* If the 'showSaveFilePicker' method on window object does not exist than fallback will download to the standard system location */
      if (!(window as any).showSaveFilePicker) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "poster.png";
        link.click();
        return;
      }

      const handle = await (window as any).showSaveFilePicker({
        suggestedName: "poster.png",
        types: [
          {
            description: "PNG Image",
            accept: { "image/png": [".png"] },
          },
        ],
      });

      const writable = await handle.createWritable();
      await writable.write(blob);
      await writable.close();
    } catch (error) {
      handleFocusBack();
      // eslint-disable-next-line prettier/prettier, no-console
      console.error("Error saving file:", error);
    }
  };

  const handleDownload = async () => {
    if (!canvasContainerRef.current) {
      return;
    }
    addWindowListener();

    /* setting a fixed height and width for canvas- turns out html2canvas needs that to generate clear and unblurred images */
    const canvasEl = canvasContainerRef.current;
    const canvasRealHight = canvasEl.clientHeight;
    const canvasRealWidth = canvasEl?.clientWidth;
    canvasEl.style.height = `${canvasRealHight}px`;
    canvasEl.style.width = `${canvasRealWidth}px`;
    /* if textArea is added, replacing it with div because text inside text area seems to be cut of in some unexpected places  */
    if (textAreaRef.current && textAreaDivCloneRef) {
      const textAreaEl = textAreaRef.current;
      const textAreaDivEl = textAreaDivCloneRef.current as HTMLDivElement;

      textAreaDivEl.innerText = textAreaEl.value;
      textAreaEl.style.display = "none";
      textAreaDivEl.style.display = "block";
    }

    const SCALE_FACTOR = 2;

    const canvas = await html2canvas(canvasContainerRef!.current!, {
      useCORS: true,
      backgroundColor: null,
      scale: SCALE_FACTOR,
    });

    const finalCanvas = document.createElement("canvas");
    finalCanvas.width = 1080;
    finalCanvas.height = 1350;

    const ctx = finalCanvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(canvas, 0, 0, 1080, 1350);

    finalCanvas.toBlob((blob) => {
      if (blob) {
        saveImage(blob);
      }
    }, "image/png");

    canvasEl.style.height = "unset";
    canvasEl.style.width = "unset";

    if (textAreaRef.current && textAreaDivCloneRef) {
      const textAreaEl = textAreaRef.current;
      const textAreaDivEl = textAreaDivCloneRef.current as HTMLDivElement;

      textAreaEl.style.display = "unset";
      textAreaDivEl.style.display = "none";
    }
  };

  return (
    <div className="controls__wrapper">
      <header className="controls__header">
        <div className="header__logo-wrapper">
          <Logo />
          <h1 className="logo-wrapper__title">CanvasEditor</h1>
        </div>
        <ResetButton />
      </header>
      <hr className="hr" />
      <p className="add-content">Add content</p>
      <Controls />
      <hr className="hr" />
      <button
        type="button"
        className="export-button primary-button"
        onClick={handleDownload}
        disabled={isExportDisabled}
      >
        Export to PNG
      </button>
    </div>
  );
};

export default CanvasControls;
