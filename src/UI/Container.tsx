import style from "./Container.module.css";

const Container = (props) => {
  return <section id={style.container}>{props.children}</section>;
};

export default Container;
