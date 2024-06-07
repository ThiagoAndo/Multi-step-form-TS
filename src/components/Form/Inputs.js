import { useState, useRef, useEffect } from "react";
import { formCheck } from "./formValidation";
import style from "./Form.module.css";

import CartModal from "../../UI/Modal";

const Inputs = (props) => {
  const [autoComplete, setAutoComplete] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);
  const [msg, setMsg] = useState({});
  const inputRef = useRef();
  const modal = useRef();
  const item = localStorage.getItem(props.id);

  useEffect(() => {
    inputRef.current.value = item;
    props.onComplete(props.id, item);
  }, []);

  const checkInputValue = (call) => {
    const inputName = inputRef.current.id;
    const val = inputRef.current.value.trim();
    const retu = formCheck[inputName](val);
    if (retu === true) {
      props.onComplete(inputName, val);
      return;
    } else if (call != "autoFill") {
      setMsg(retu);
      setIsEmpty(true);
      modal.current.open();
      return;
    }

    setAutoComplete(false);
    setTimeout(() => {
      inputRef.current.value = "";
      inputRef.current.blur();
      setIsEmpty(true);
    }, 500);
  };

  const handleInput = (call) => {
    if (item) return;
    const val = inputRef.current.value.trim();
    switch (call) {
      case "blur":
        if (val === "") {
          setIsEmpty(true);
        } else {
          checkInputValue("input");
        }
        break;
      case "focus":
        if (inputRef.current.value === "⚠️") {
          inputRef.current.value = "";
        }
        setIsEmpty(false);
        break;
    }
  };

  const handleBrowserAutoComplete = () => {
    if (autoComplete && !item) {
      checkInputValue("autoFill");
    }
  };

  return (
    <>
      <CartModal ref={modal} txt={msg} call={"validation"}></CartModal>
      <label
        htmlFor={props.label}
        style={isEmpty === true ? { color: "#f70b0b98" } : undefined}
      >
        {props.label}
      </label>
      <input
        ref={inputRef}
        onChange={handleBrowserAutoComplete}
        onBlur={() => {
          handleInput("blur");
        }}
        onFocus={() => {
          handleInput("focus");
        }}
        value={isEmpty === true ? "⚠️" : undefined}
        className={isEmpty === true ? style.empty : undefined}
        {...props}
        required
      />
    </>
  );
};

export default Inputs;
