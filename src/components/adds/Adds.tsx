import { useContext } from "react";
import "../PlanType/PlanType.css";
import Instruction from "../holdTop/Instructions";
import Add from "./Add";
import AuthContext from "../../context/auth-context";
export default function Adds() {
  const context = useContext(AuthContext);
  const picked = context!.addId;
  const leng = context!.planLenght;
  return (
    <section className={"formCont addOn grid_month"} id={"planCont"}>
      <Instruction
        select={"Pick add-ons"}
        option={"Add-ons help enhance your gaming experience."}
      />
      <Add
        key={"OS"}
        id={"A"}
        service={"Online service"}
        advantage={"Access to multiplayer games"}
        addActive={picked.includes("A") === true ? "active" : ""}
        price={
          leng === "month"
            ? { txt: "+$1/mo", num: 1 }
            : { txt: "$10/yr", num: 10 }
        }
      />
      <Add
        key={"LS"}
        id={"B"}
        service={"Larger storage"}
        advantage={"Extra 1TB of cloud save"}
        addActive={picked.includes("B") === true ? "active" : ""}
        price={
          leng === "month"
            ? { txt: "+$2/mo", num: 2 }
            : { txt: "$20/yr", num: 20 }
        }
      />
      <Add
        key={"CP"}
        id={"C"}
        service={" Customizable Profile"}
        advantage={"Custom theme on your profile"}
        addActive={picked.includes("C") === true ? "active" : ""}
        price={
          leng === "month"
            ? { txt: "+$2/mo", num: 2 }
            : { txt: "$20/yr", num: 20 }
        }
      />
    </section>
  );
}
