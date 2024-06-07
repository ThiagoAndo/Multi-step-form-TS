import { useState, useContext, useEffect } from "react";

import "./PlanType.css";
import arcade from "../assets/images/icon-arcade.svg";
import advanced from "../assets/images/icon-advanced.svg";
import pro from "../assets/images/icon-pro.svg";

import AuthContext from "../../context/auth-context";
import Plan from "./Plan";
import Instruction from "../holdTop/Instructions";
import Button from "./Button";

const month = [
  {
    txt: "$9/mo",
    price: 9,
  },
  {
    txt: "$12/mo",
    price: 12,
  },
  {
    txt: "$15/mo",
    price: 15,
  },
  "month",
];

const year = [
  {
    txt: "$90/yr",
    price: 90,
  },
  {
    txt: "$120/yr",
    price: 120,
  },
  {
    txt: "$150/yr",
    price: 150,
  },
  "year",
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

  const handleClick = (clickNum, type) => {
    setClickup(clickNum);
    context.setPlan(type, length[clickNum].price);
    localStorage.setItem("plan", type);
    localStorage.setItem("planPrice", length[clickNum].price);
  };

  return (
    <section
      id={"planCont"}
      className={length[3] === "year" ? "grid_year" : "grid_month"}
    >
      <Instruction
        info={{
          select: "Select your plan",
          option: "You have the option of monthly or yearly billing.",
        }}
      />

      <div id={"planDesk"}>
        <Plan
          key={"Arcade"}
          info={{
            type: "Arcade",
            price: length[0]["txt"],
            length: length[3],
          }}
          svg={arcade}
          click={0}
          class={`${clickUp == 0 ? myClass : "planType"}`}
          onClick={handleClick}
        />
        <Plan
          key={"Advanced"}
          info={{
            type: "Advanced",
            price: length[1]["txt"],
            length: length[3],
          }}
          svg={advanced}
          length={length[3]}
          click={1}
          class={`${clickUp == 1 ? myClass : "planType"}`}
          onClick={handleClick}
        />
        <Plan
          key={"Pro"}
          info={{
            type: "Pro",
            price: length[2]["txt"],
            length: length[3],
          }}
          svg={pro}
          click={2}
          class={`${clickUp == 2 ? myClass : "planType"}`}
          onClick={handleClick}
        />
      </div>
      <Button />
    </section>
  );
};

export default Plantype;
