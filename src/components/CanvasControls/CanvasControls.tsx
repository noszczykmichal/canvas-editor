/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from "react";
import html2canvas from "html2canvas";

import Logo from "../../icons/Logo";
import ResetButton from "./ResetButton/ResetButton";
import Controls from "./Controls/Controls";
import CanvasContext from "../../store/context";
import "./CanvasControls.scss";

const CanvasControls = () => {
  const { canvasContainerRef } = useContext(CanvasContext);

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
      console.error("Error saving file:", error);
    }
  };

  const handleDownload = async () => {
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
  };

  return (
    <div className="controls__wrapper">
      <header className="controls__header">
        <div className="header__logo-wrapper">
          <Logo />
          <h1>CanvasEditor</h1>
        </div>
        <ResetButton />
      </header>
      <hr className="hr" />
      <p className="add-content">Add content</p>
      <Controls />
      <hr className="hr" />
      <button className="export-button primary-button" onClick={handleDownload}>
        Export to PNG
      </button>
    </div>
  );
};

export default CanvasControls;
