import { FC, useContext } from "react";

import CanvasContext from "../store/context";

interface TrashIconProps {
  className: string;
}

const TrashIcon: FC<TrashIconProps> = ({ className }) => {
  const { setImageBoxBackground } = useContext(CanvasContext);

  const onTrashIconClick = () => {
    setImageBoxBackground("");
  };

  return (
    <div className={className} onClick={onTrashIconClick}>
      <svg
        width="15"
        height="18"
        viewBox="0 0 20 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M17.7778 6.54512C17.4831 6.54512 17.2005 6.66005 16.9921 6.86463C16.7837 7.0692 16.6667 7.34666 16.6667 7.63598V19.8437C16.6348 20.3953 16.3822 20.9123 15.9639 21.2819C15.5456 21.6515 14.9954 21.8439 14.4333 21.8171H5.56667C5.00455 21.8439 4.45443 21.6515 4.03612 21.2819C3.61781 20.9123 3.36521 20.3953 3.33333 19.8437V7.63598C3.33333 7.34666 3.21627 7.0692 3.0079 6.86463C2.79952 6.66005 2.51691 6.54512 2.22222 6.54512C1.92754 6.54512 1.64492 6.66005 1.43655 6.86463C1.22817 7.0692 1.11111 7.34666 1.11111 7.63598V19.8437C1.14283 20.9741 1.62954 22.0461 2.46464 22.8248C3.29975 23.6036 4.41519 24.0258 5.56667 23.9988H14.4333C15.5848 24.0258 16.7002 23.6036 17.5354 22.8248C18.3705 22.0461 18.8572 20.9741 18.8889 19.8437V7.63598C18.8889 7.34666 18.7718 7.0692 18.5635 6.86463C18.3551 6.66005 18.0725 6.54512 17.7778 6.54512Z" />
        <path d="M18.8889 3.27256H14.4444V1.09085C14.4444 0.801541 14.3274 0.524078 14.119 0.319504C13.9106 0.114929 13.628 0 13.3333 0H6.66667C6.37198 0 6.08937 0.114929 5.88099 0.319504C5.67262 0.524078 5.55556 0.801541 5.55556 1.09085V3.27256H1.11111C0.816426 3.27256 0.533811 3.38749 0.325437 3.59207C0.117063 3.79664 0 4.0741 0 4.36341C0 4.65273 0.117063 4.93019 0.325437 5.13476C0.533811 5.33934 0.816426 5.45427 1.11111 5.45427H18.8889C19.1836 5.45427 19.4662 5.33934 19.6746 5.13476C19.8829 4.93019 20 4.65273 20 4.36341C20 4.0741 19.8829 3.79664 19.6746 3.59207C19.4662 3.38749 19.1836 3.27256 18.8889 3.27256ZM7.77778 3.27256V2.18171H12.2222V3.27256H7.77778Z" />
        <path d="M8.88889 17.4537V9.81768C8.88889 9.52837 8.77183 9.25091 8.56345 9.04633C8.35508 8.84176 8.07246 8.72683 7.77778 8.72683C7.48309 8.72683 7.20048 8.84176 6.9921 9.04633C6.78373 9.25091 6.66667 9.52837 6.66667 9.81768V17.4537C6.66667 17.743 6.78373 18.0204 6.9921 18.225C7.20048 18.4296 7.48309 18.5445 7.77778 18.5445C8.07246 18.5445 8.35508 18.4296 8.56345 18.225C8.77183 18.0204 8.88889 17.743 8.88889 17.4537Z" />
        <path d="M13.3333 17.4537V9.81768C13.3333 9.52837 13.2163 9.25091 13.0079 9.04633C12.7995 8.84176 12.5169 8.72683 12.2222 8.72683C11.9275 8.72683 11.6449 8.84176 11.4365 9.04633C11.2282 9.25091 11.1111 9.52837 11.1111 9.81768V17.4537C11.1111 17.743 11.2282 18.0204 11.4365 18.225C11.6449 18.4296 11.9275 18.5445 12.2222 18.5445C12.5169 18.5445 12.7995 18.4296 13.0079 18.225C13.2163 18.0204 13.3333 17.743 13.3333 17.4537Z" />
      </svg>
    </div>
  );
};

export default TrashIcon;
