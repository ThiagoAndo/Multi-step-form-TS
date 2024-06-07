import "./MessageBox.css";

export default function MessageBox({ txt, close, call, onClick, click }) {
  let txtMsg = "Alert!";
  let myClass = "warning";
  let btnTxt = "Ok";

  if (call === "Info") {
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
        navigator.clipboard.writeText(txt.inf);
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
          <strong>{txtMsg}</strong><br/><br/>
          {txt.msg}
          {call === "validation" ? (
            <div className={"copy"}>
              <input
                type="text"
                className={"inp"}
                value={txt.inf}
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
