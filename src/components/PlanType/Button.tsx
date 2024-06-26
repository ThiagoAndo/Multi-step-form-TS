import { useContext } from "react";
import AuthContext from "../../context/auth-context";
import style from "./Button.module.css";
const Button = () => {
  const context = useContext(AuthContext);
  console.log("context!.planLenght");
  console.log(context!.planLenght);
  const handleTransition = () => {
    context!.setLenght();
  };
  return (
    <div id={style.holdBtn}>
      <div
        className={
          context!.planLenght == "month" ? style.textColor : style.color
        }
      >
        Monthly
      </div>
      <div id={style.btn} onClick={handleTransition}>
        <div className={`${style.trans} ${style[context!.planLenght]}`}></div>
      </div>
      <div
        className={
          context!.planLenght == "year" ? style.textColor : style.color
        }
      >
        Yearly
      </div>
    </div>
  );
};
export default Button;
