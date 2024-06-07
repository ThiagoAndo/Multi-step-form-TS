import "./PlanType.css";

const Plan = (props) => {

  const handleClick = () => {
    props.onClick(props.click, props.info.type);
  };
  return (
    <div className={props.class} onClick={() => handleClick(props.click)}>
      <div>
        <img src={props.svg}></img>
      </div>
      <div className={"txt"}>
        <p className={"pDesk"}>{props.info.type}</p>
        <p className={"pDesk"}>{props.info.price}</p>
        <p
          className={
            props.info.length === "year"
              ? "yerlyVisible visible"
              : "yerlyVisible"
          }
        >
          2 months free
        </p>
      </div>
    </div>
  );
};

export default Plan;
