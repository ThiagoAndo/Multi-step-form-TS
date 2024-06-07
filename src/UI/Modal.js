import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import MessageBox from "./MessageBox";
import "./Modal.css";

const CartModal = forwardRef(function Modal(
  { txt, call, onClick, click },
  ref
) {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        dialog.current.showModal();
      },
    };
  });

  const handleClick = () => {
    dialog.current.close();
  };

  return createPortal(
    <dialog id="modal" ref={dialog} close={handleClick}>
      <MessageBox
        txt={txt}
        close={handleClick}
        call={call}
        onClick={onClick}
        click={click}
      ></MessageBox>
    </dialog>,
    document.getElementById("modal")
  );
});

export default CartModal;
