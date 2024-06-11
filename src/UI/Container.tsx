import { type ReactNode } from "react";
import style from "./Container.module.css";
type ContChildren = {
  children: ReactNode;
};

const Container = ({ children }: ContChildren) => {
  return <section id={style.container}>{children}</section>;
};

export default Container;
