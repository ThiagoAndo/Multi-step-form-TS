import { useContext} from "react";

import Instruction from "../holdTop/Instructions";
import AuthContext from "../../context/auth-context";
import AddPrice from "./AddPrice";
const Totals = ({ onChangePlan }) => {
  const context = useContext(AuthContext);
  let adds = context.chooseAdd;
  let plan = context.choosePlan;
  const res = context.planLenght;
  const total = context.finalAmount;

  let addLength = {};
  if (context.planLenght === "month") {
    addLength.type = "Monthly";
    addLength.add = "mo";
  } else {
    addLength.type = "Yerly";
    addLength.add = "yr";
  }

  return (
    <section className={" formCont addOn"} id={"fUp"}>
      <Instruction
        info={{
          select: "Finishin Up",
          option: "Double-check everything looks OK before confirming",
        }}
      />
      <div className={"planType stop_effect"}>
        <div className={"txt"}>
          <p>{`${plan.type + "(" + addLength.type + ")"}`}</p>
          <p>
            <a
              href="#"
              id={"change"}
              onClick={() => {
                onChangePlan("change");
              }}
            >
              Change
            </a>
          </p>
        </div>
        <div>
          <p className={"prc prc3"} id={"finalOne"}>
            {`${plan.price + "/" + addLength.add}`}
          </p>
        </div>
      </div>
      {adds.map((add) => (
        <AddPrice
          add={add.service}
          price={add.price}
          addLength={addLength.add}
        />
      ))}
      <div className={"planType stop_effect lh"} id={"totalP"}>
        <div className={"txt"}>
          <p className={"fTxt"}>Total {`${"(" + "per " + res + ")"}`}</p>
        </div>
        <div>
          <p className={"prc prc2"}>{`${"$" + total + "/" + addLength.add}`}</p>
        </div>
      </div>
    </section>
  );
};
export default Totals;
