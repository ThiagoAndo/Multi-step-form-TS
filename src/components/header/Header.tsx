import style from "./Header.module.css";
import { type PropsWithChildren } from "react";
const Header = ({ children }: PropsWithChildren) => {
  return (
    <div id={style.header}>
      <div>{children}</div>
    </div>
  );
};
export default Header;
