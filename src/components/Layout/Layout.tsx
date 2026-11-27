import { ReactNode } from "react";
import { createPortal } from "react-dom";

import Backdrop from "@/components/ui/Backdrop/Backdrop";
import Modal from "@/components/ui/Modal/Modal";
import "@/components/Layout/Layout.scss";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      {createPortal(
        [<Backdrop key={1} />, <Modal key={2} />],
        document.getElementById("modals-root") as HTMLDivElement,
      )}
      <main>{children}</main>
    </>
  );
}
