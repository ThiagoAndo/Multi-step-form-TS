import style from "./StepNumTreck.module.css";

const StepNumTreck =(props)=>{
return (
  <div className={style.numContainer}>
    <span className={`${style.pNum} ${style[props.class]}`}>
      {props.children}
    </span>
    <div className={style.onliDesk}>
      <p>{props.txt}</p>
      <p>{props.txt2}</p>
    </div>
  </div>
);
}

export default StepNumTreck