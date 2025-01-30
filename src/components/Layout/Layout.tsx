import { FC, ReactNode } from "react";

import "./Layout.scss";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return <main>{children}</main>;
};

export default Layout;
