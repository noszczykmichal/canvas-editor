import Logo from "../../icons/Logo";
import ResetButton from "./ResetButton/ResetButton";
import Controls from "./Controls/Controls";
import classes from "./CanvasControls.module.scss";

const CanvasControls = () => {
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
      <button className={classes["export-button"]}>Export to PNG</button>
    </div>
  );
};

export default CanvasControls;
