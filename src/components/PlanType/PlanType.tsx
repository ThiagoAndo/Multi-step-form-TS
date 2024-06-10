import { useState, useContext, useEffect } from "react";

import "./PlanType.css";
import arcade from "../assets/images/icon-arcade.svg";
import advanced from "../assets/images/icon-advanced.svg";
import pro from "../assets/images/icon-pro.svg";

import AuthContext from "../../context/auth-context";
import Plan from "./Plan";
import Instruction from "../holdTop/Instructions";
import Button from "./Button";
type Plans = {
  txt: string;
  price: number;
  length?: string;
};
const month: Plans[] = [
  {
    txt: "$9/mo",
    price: 9,
    length: "month",
  },
  {
    txt: "$12/mo",
    price: 12,
  },
  {
    txt: "$15/mo",
    price: 15,
  },
];

const year = [
  {
    txt: "$90/yr",
    price: 90,
    length: "year",
  },
  {
    txt: "$120/yr",
    price: 120,
  },
  {
    txt: "$150/yr",
    price: 150,
  },
];
const Plantype = () => {
  const context = useContext(AuthContext);
  localStorage.setItem("lenght", context.planLenght);
  const planLocal = localStorage.getItem("plan");
  const planLocalPrice = localStorage.getItem("planPrice");
  let choose;
  switch (planLocal) {
    case "Arcade":
      choose = 0;
      break;
    case "Advanced":
      choose = 1;
      break;
    case "Pro":
      choose = 2;
      break;
    default:
      choose = -1;
  }
  const [length, setLength] = useState(month);
  const [clickUp, setClickup] = useState(choose);
  const myClass = "active planType";
  const len = length[0]["length"] as string;

  useEffect(() => {
    if (context.planLenght === "month") {
      setLength(month);
    } else {
      setLength(year);
    }

    if (planLocal && planLocalPrice && context.choosePlan.type === "") {
      context.setPlan(planLocal, Number(planLocalPrice));
    }
  }, [context.planLenght]);

  const handleClick = (clickNum:number, type:string) => {
    setClickup(clickNum);
    context.setPlan(type, length[clickNum].price);
    localStorage.setItem("plan", type);
    localStorage.setItem("planPrice", length[clickNum].price + "");
  };

  return (
    <section
      id={"planCont"}
      className={len === "year" ? "grid_year" : "grid_month"}
    >
      <Instruction
        select={"Select your plan"}
        option={"You have the option of monthly or yearly billing."}
      />

      <div id={"planDesk"}>
        <Plan
          key={"Arcade"}
          info={{
            type: "Arcade",
            price: length[0]["txt"],
            length: len,
          }}
          svg={arcade}
          click={0}
          ThisClass={`${clickUp == 0 ? myClass : "planType"}`}
          onClick={handleClick}
        />
        <Plan
          key={"Advanced"}
          info={{
            type: "Advanced",
            price: length[1]["txt"],
            length: len,
          }}
          svg={advanced}
          click={1}
          ThisClass={`${clickUp == 1 ? myClass : "planType"}`}
          onClick={handleClick}
        />
        <Plan
          key={"Pro"}
          info={{
            type: "Pro",
            price: length[2]["txt"],
            length: len,
          }}
          svg={pro}
          click={2}
          ThisClass={`${clickUp == 2 ? myClass : "planType"}`}
          onClick={handleClick}
        />
      </div>
      <Button />
    </section>
  );
};

export default Plantype;
