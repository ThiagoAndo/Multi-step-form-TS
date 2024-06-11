import style from "./Instructions.module.css";
const Instruction = ({
  select,
  option,
}: {
  select: string;
  option: string;
}) => {
  return (
    <div className={style.holdLabel}>
      <h1>{select}</h1>
      <p className={style.par}>{option}</p>
    </div>
  );
};
export default Instruction;
