import { useContext } from "react";
import html2canvas from "html2canvas";

import Logo from "../../icons/Logo";
import ResetButton from "./ResetButton/ResetButton";
import Controls from "./Controls/Controls";
import CanvasContext from "../../store/context";
import classes from "./CanvasControls.module.scss";

const CanvasControls = () => {
  const { canvasContainerRef } = useContext(CanvasContext);

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

    // Export PNG
    const link = document.createElement("a");
    link.href = finalCanvas.toDataURL("image/png", 1.0);
    link.download = "poster.png";
    link.click();
  };

  return (
    <div className={classes["controls__wrapper"]}>
      <header className={classes["controls__header"]}>
        <div className={classes["header__logo-wrapper"]}>
          <Logo />
          <h1>CanvasEditor</h1>
        </div>
        <ResetButton />
      </header>
      <hr className={classes.hr} />
      <p className={classes["add-content"]}>Add content</p>
      <Controls />
      <hr className={classes.hr} />
      <button className={classes["export-button"]} onClick={handleDownload}>
        Export to PNG
      </button>
    </div>
  );
};

export default CanvasControls;
