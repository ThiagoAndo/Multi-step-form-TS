import { forwardRef, useImperativeHandle, useRef } from "react";
import { Inf } from "../components/footer/FormControl";
import { createPortal } from "react-dom";
import MessageBox from "./MessageBox";
import "./Modal.css";
export type ModalHandle = {
  open: () => void;
};
type ModalProps = {
  msg: Inf;
  onClick: () => void;
  click: number | null;
};
const CartModal = forwardRef<ModalHandle, ModalProps>(function Modal(
  { msg, onClick, click },
  ref
) {
  const dialog = useRef<HTMLDialogElement>(null);
  useImperativeHandle(ref, () => {
    return {
      open: () => {
        if (dialog.current) {
          dialog.current.showModal(); // showModal() is a built-in method available on the <dialog> element
        }
      },
    };
  });
  const handleClick = () => {
    dialog.current!.close();
  };
  return createPortal(
    <dialog id="modal" ref={dialog} onClose={handleClick}>
      <MessageBox
        msg={msg}
        close={handleClick}
        onClick={onClick}
        click={click}
      ></MessageBox>
    </dialog>,
    document.getElementById("modal")!
  );
});
export default CartModal;
