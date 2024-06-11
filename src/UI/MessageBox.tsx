import "./MessageBox.css";
import { Inf } from "../components/botton/FormControl";
type MProps = {
  msg: Inf;
  close: () => void;
  onClick: () => void;
  click: number | null;
};

export default function MessageBox({ msg, close, onClick, click }: MProps) {
  const txtMsg = "Alert!";
  const myClass = "warning";
  let btnTxt = "Ok";
  const message = msg.inf || "";

  if (msg.call === "Info") {
    btnTxt = "Yes";
  }

  const handleClick = () => {
    close();
  };

  function myFunction() {
    switch (click) {
      case 0:
        btnTxt = "Ok";
        close();
        break;
      case 1:
        btnTxt = "Ok";
        close();
        break;
      case 2:
        btnTxt = "Yes";
        close();
        onClick();
        break;
      default:
        navigator.clipboard.writeText(message);
        close();
    }
  }

  return (
    <div className={"content"}>
      <div className={"alert alert-warning alert-white rounded"}>
        <button
          onClick={handleClick}
          type="button"
          className={"close"}
          data-dismiss="alert"
          aria-hidden="true"
        >
          ×
        </button>
        <div className={"icon"}>
          <div className={`fa-warning ${myClass}`}></div>
        </div>
        <div className={"hold-txt"}>
          <strong>{txtMsg}</strong>
          <br />
          <br />
          {msg.msg}
          {msg.call === "validation" ? (
            <div className={"copy"}>
              <input
                type="text"
                className={"inp"}
                value={msg.inf}
                id="myInput"
              />
              <button className={"btnMsg"} onClick={myFunction}>
                Copy
              </button>
            </div>
          ) : (
            <div className={"copy"}>
              <button className={"btnMsg"} onClick={myFunction}>
                {btnTxt}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
