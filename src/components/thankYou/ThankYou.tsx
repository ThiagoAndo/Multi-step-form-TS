import img from "../assets/images/icon-thank-you.svg";
import "../PlanType/PlanType.css";

const ThankYou = () => {
  return (
    <section id={"finishd"} class={"grid_month addOn"}>
      <img src={img} />
      <div className={"holdLabel"}>
      <h1 className={"h1"}>Thank you!</h1>
      <p >
        Thanks for confirming your subscription! We hope you have fun using our
        platform. If you ever need support, please feel free to email us at
        support@loremgaming.com
      </p>
      </div>
    </section>
  );
};

export default ThankYou;
