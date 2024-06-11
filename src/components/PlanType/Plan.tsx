import "./PlanType.css";

type PlnaProps = {
  svg: string;
  click: number;
  ThisClass: string;
  onClick: (a: number, b: string) => void;
  info: { type: string; price: string; length: string };
};

const Plan = ({ svg, click, ThisClass, onClick, info }: PlnaProps) => {
  const handleClick = () => {
    onClick(click, info.type);
  };
  return (
    <div className={ThisClass} onClick={handleClick}>
      <div>
        <img src={svg}></img>
      </div>
      <div className={"txt"}>
        <p className={"pDesk"}>{info.type}</p>
        <p className={"pDesk"}>{info.price}</p>
        <p
          className={
            info.length === "year" ? "yerlyVisible visible" : "yerlyVisible"
          }
        >
          2 months free
        </p>
      </div>
    </div>
  );
};

export default Plan;
