import { useState } from "react";
import Container from "./UI/Container";
import Header from "./components/header/Header";
import StepNumTreck from "./components/header/StepNumTreck";
import FormControl from "./components/footer/FormControl";
import textObj from "./components/header/textObj/headerObj";
import Plantype from "./components/PlanType/PlanType";
import Form from "./components/Form/Form";
import Adds from "./components/adds/Adds";
import Totals from "./components/total/Totals";
import ThankYou from "./components/thankYou/ThankYou";
function App() {
  const [click, setClick] = useState(0);
  const handleClick = (direction: string) => {
    if (direction === "forward") {
      setClick((prev) => (prev = prev + 1));
    } else if (direction === "backward") {
      setClick((prev) => prev - 1);
    } else if (direction === "change") {
      setClick(1);
    }
  };
  if (click === 4) {
    localStorage.clear();
  }
  return (
    <Container>
      <>
        <Header>
          {textObj.map((txts, index) => (
            <StepNumTreck
              key={index}
              thisClass={click === index ? "backColor" : ""}
              txt={txts.txt}
              txt2={txts.txt2}
            >
              {index + 1}
            </StepNumTreck>
          ))}
        </Header>
        {click === 0 ? <Form /> : null}
        {click === 1 ? <Plantype /> : null}
        {click === 2 ? <Adds /> : null}
        {click === 3 ? <Totals onChangePlan={handleClick} /> : null}
        {click < 4 ? (
          <FormControl onClick={handleClick} click={click} />
        ) : (
          <ThankYou />
        )}
      </>
    </Container>
  );
}
export default App;
