import {
  useState,
  useRef,
  useEffect,
  type ComponentPropsWithoutRef,
} from "react";
import { Check, formCheck } from "./formValidation";
import style from "./Form.module.css";
import { Inf } from "../botton/FormControl";
import CartModal, { ModalHandle } from "../../UI/Modal";

type InpProps = {
  label: string;
  id: string;
  onComplete: (a: string, b: string) => void;
} & ComponentPropsWithoutRef<"input">;

const Inputs = ({ label, id, onComplete, ...props }: InpProps) => {
  const [autoComplete, setAutoComplete] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);
  const [msg, setMsg] = useState<Inf>({
    msg: "",
    call: "validation",
    inf: "",
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const modal = useRef<ModalHandle>(null);

  const item = localStorage.getItem(id);

  const checkInputValue = (call: string) => {
    const inpID = inputRef.current!.id;
    type Name ="name" |"email" | "phone"
    const val = inputRef.current!.value.trim();
    let funcName :Name ="name";
    switch (val) {
      case "name":
        funcName = "name";
        break;
        }
        
        const func = formCheck[funcName];

    const ret = func(val);
    if (ret === true) {
      onComplete(funcName, val);
      return;
    } else if (call != "autoFill") {
      setMsg(ret as Inf);
      setIsEmpty(true);
      modal.current!.open();
      return;
    }

    setAutoComplete(false);
    setTimeout(() => {
      inputRef.current!.value = "";
      inputRef.current!.blur();
      setIsEmpty(true);
    }, 500);
  };

  const handleInput = (call: string) => {
    if (item) return;
    const val = inputRef.current!.value.trim();
    switch (call) {
      case "blur":
        if (val === "") {
          setIsEmpty(true);
        } else {
          checkInputValue("input");
        }
        break;
      case "focus":
        if (inputRef.current!.value === "⚠️") {
          inputRef.current!.value = "";
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
  useEffect(() => {
    if (item !== null) {
      inputRef.current!.value = item;
    }
    onComplete(id, item ?? "");
  }, []);

  return (
    <>
      <CartModal
        ref={modal}
        msg={msg}
        onClick={() => {}}
        click={null}
      ></CartModal>
      <label
        htmlFor={label}
        style={isEmpty === true ? { color: "#f70b0b98" } : undefined}
      >
        {label}
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
