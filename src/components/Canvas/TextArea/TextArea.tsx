import TrashIcon from "../../../icons/TrashIcon";
import Atom from "../../../icons/Atom";
import Move from "../../../icons/Move";
import "./TextArea.scss";

const TextArea = () => {
  return (
    <div className="text-area">
      <TrashIcon className="icon delete-icon" />
      <Move className="icon move-icon" />
      <Atom className="icon resize-icon" />
      <textarea className="content" placeholder="your text in here"></textarea>
    </div>
  );
};

export default TextArea;
