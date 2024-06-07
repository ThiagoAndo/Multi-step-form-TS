import style from "./Atribution.module.css";

const Attribution = () => {
  return (
    <div className={style.attribution}>
        Challenge by
        <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">
          Frontend Mentor
        </a>
        . Coded by{" "}
        <a href="https://github.com/ThiagoAndo" target="_blank">
          Thiago Freitas
        </a>
        .
    </div>
  );
};

export default Attribution