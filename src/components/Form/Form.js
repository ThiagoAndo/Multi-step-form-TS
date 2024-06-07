import { useState, useContext } from "react";

import style from "./Form.module.css";
import AuthContext from "../../context/auth-context";
import Inputs from "./Inputs";
import iptCont from "./inputContent";
import Instruction from "../holdTop/Instructions";
const Form = () => {
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const context = useContext(AuthContext);

  function handleChange(inputIdentifier, val) {
    setUserInput((prevUserInput) => {
      return {
        ...prevUserInput,
        [inputIdentifier]: val,
      };
    });
  }
  const { name, email, phone } = userInput;

  if (name && email && phone) {
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("phone", phone);
    context.formConf = true;
  }

  return (
    <section className={style["formCont"]}>
      <Instruction
        info={{
          select: "Personal info",
          option: " Please provide your name, email address, and phone number.",
        }}
      />

      <form action="" id={style["resform"]}>
        {iptCont.map((cont) => (
          <Inputs
            key={cont.id}
            label={cont.label}
            type={cont.type}
            name={cont.name}
            id={cont.id}
            placeholder={cont.placeholder}
            onComplete={handleChange}
          />
        ))}
      </form>
    </section>
  );
};

export default Form;
