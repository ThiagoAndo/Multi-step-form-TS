import style from "./Header.module.css";

const Header = (props) => {
  return (
    <div id={style.header}>
      <div>{props.children}</div>
    </div>
  );
};

export default Header;
