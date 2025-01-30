import RefreshIcon from "../../../icons/RefreshIcon";
import classes from "./ResetButton.module.scss";

const ResetButton = () => {
  return (
    <button className={classes["refresh-button"]}>
      Reset
      <RefreshIcon />
    </button>
  );
};

export default ResetButton;
