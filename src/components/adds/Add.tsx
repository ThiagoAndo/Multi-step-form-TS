import { useState, useRef, useContext, useEffect } from "react";

import AuthContext from "../../context/auth-context";
import "../PlanType/PlanType.css";

type AddProps = {
  service: string;
  advantage: string;
  price: { txt: string; num: number };
  addActive: string;
  id: string;
};
export default function Add({
  service,
  advantage,
  price,
  addActive,
  id,
}: AddProps) {
  const [active, setActive] = useState(addActive);
  const myRef = useRef<HTMLInputElement>(null);
  const context = useContext(AuthContext);
  const localAdd = localStorage.getItem(id);
  const addLength = context!.chooseAdd.length;

  useEffect(() => {
    if (addActive) {
      myRef.current!.checked = true;
    }
    if (localAdd && addLength === 0) {
      handleClick();
    }
  }, []);

  const handleClick = () => {
    if (active === "active") {
      setActive("");
      myRef.current!.checked = false;
      context!.setAdd(service, id, 0, "");
      localStorage.removeItem(id);
    } else if (addLength <= 3) {
      context!.setAdd(service, id, price.num, "add");
      myRef.current!.checked = true;
      setActive("active");
      localStorage.setItem("id", id);
    }
  };

  return (
    <div className={`planType add ${active}`} onClick={handleClick}>
      <div className={"cheBox"}>
        <input type={"checkbox"} ref={myRef} />
      </div>
      <div className={"txt"}>
        <p>{service}</p>
        <p>{advantage}</p>
      </div>
      <div>
        <p className={"prc prc1"}>{price.txt}</p>
      </div>
    </div>
  );
}
