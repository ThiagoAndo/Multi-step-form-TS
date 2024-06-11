import { useState, useRef, useContext } from "react";
import AuthContext from "../../context/auth-context";
import CartModal, { ModalHandle } from "../../UI/Modal";
import "./FormControl.css";
type FcProps = {
  onClick: (direction: string) => void;
  click: number;
};
export type Inf = {
  msg: string;
  inf?: string;
  call?: string;
};
const FormControl = ({ onClick, click }: FcProps) => {
  const [msg, setMsg] = useState<Inf>({
    msg: "",
    call: "",
    inf: "",
  });
  const context = useContext(AuthContext);
  const modal = useRef<ModalHandle>(null);
  const handleClick = (call: string) => {
    switch (call) {
      case "N":
        if (click >= 0) {
          if (click === 0 && !context!.formConf) {
            setMsg({
              msg: "Make sure to fill in the form. The filds must be correct",
              call: "alert",
            });
            modal.current!.open();
          } else if (click === 0 && context!.formConf === true) {
            onClick("forward");
          } else if (click === 1 && context!.choosePlan.item.type) {
            onClick("forward");
          } else if (click === 1 && !context!.choosePlan.item.type) {
            setMsg({
              msg: "In order to carry on with your purcahse you should pick a plan",
              call: "alert",
            });
            modal.current!.open();
          } else if (click === 1 && context!.choosePlan) {
            onClick("forward");
          } else if (click === 2 && context!.chooseAdd.length === 0) {
            setMsg({
              msg: "Are you sure you will not enhance your experience with this great offer?",
              call: "info",
            });
            modal.current!.open();
            onClick("");
          } else if (click === 2 && context!.chooseAdd.length > 0) {
            onClick("forward");
            context!.setTotal();
          }
        }
        break;
      case "C":
        onClick("forward");
        break;
      case "G":
        if (click >= 1) {
          onClick("backward");
        }
        break;
      default:
        console.log("Something went wrong on FormControl");
    }
  };
  const handleModalAdd = () => {
    onClick("forward");
  };
  if (click === 3) {
    context!.setTotal();
  }
  return (
    <div className={"botton"}>
      <CartModal
        ref={modal}
        msg={msg}
        onClick={handleModalAdd}
        click={click}
      ></CartModal>
      <button
        className={click >= 1 ? "btn" : "btn intlCol"}
        onClick={() => handleClick("G")}
      >
        Go Back
      </button>
      <button
        className={"btn"}
        type="submit"
        onClick={() => handleClick(click === 3 ? "C" : "N")}
        style={click === 3 ? { backgroundColor: "#473dff" } : undefined}
      >
        {click === 3 ? "Confirm" : "Next Step"}
      </button>
    </div>
  );
};
export default FormControl;
