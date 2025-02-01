import { FC, ReactNode } from "react";
import { createPortal } from "react-dom";

import Backdrop from "../ui/Backdrop/Backdrop";
import Modal from "../ui/Modal/Modal";
import "./Layout.scss";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      {createPortal(
        [<Backdrop />, <Modal />],
        document.getElementById("modals-root") as HTMLDivElement
      )}
      <main>{children}</main>
    </>
  );
};

export default Layout;
