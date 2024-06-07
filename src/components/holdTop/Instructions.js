import style from "./Instructions.module.css";


const Instruction = (props) => {
  return (
    <div className={style.holdLabel}>
      <h1>{props.info.select}</h1>
      <p className={style.par}>{props.info.option}</p>
    </div>
  );
};

export default Instruction;