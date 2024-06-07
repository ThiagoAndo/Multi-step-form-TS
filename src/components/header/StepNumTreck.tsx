import style from "./StepNumTreck.module.css";
import { type ReactNode } from "react";

interface NumTreck{
  txt: string;
  txt2: string;
  thisClass: string;
  children: ReactNode;
}

const StepNumTreck = ({ txt, txt2 ,thisClass, children}:NumTreck) => {
  return (
    <div className={style.numContainer}>
      <span className={`${style.pNum} ${style[thisClass]}`}>{children}</span>
      <div className={style.onliDesk}>
        <p>{txt}</p>
        <p>{txt2}</p>
      </div>
      a
    </div>
  );
};

export default StepNumTreck