import {
  type ReactNode,
  useState,
  useReducer,
  useEffect,
  createContext,
} from "react";

type Items = { item: { type: string; price: number } };
type Pay = { type: string; price: number };
type add = { service: string; price: number };
type TimersContextProviderProps = {
  children: ReactNode;
};

const item: Items = { item: { type: "", price: 0 } };
type Context = {
  formConf: boolean;
  choosePlan: Items;
  setPlan: (a: string, b: number) => void;
  setLenght: () => void;
  planLenght: string;
  chooseAdd: add[];
  addId: string[];
  setAdd: (a: string, b: string, c: number, d: string) => void;
  setTotal: () => void;
  finalAmount: number;
};

const AuthContext = createContext<Context | null>(null);

let addId:string[] = [];

type ReducerActions = {
  type: "RECORD" | "UPDATE_MONTH" | "UPDATE_YEAR";
  payload?: Pay;
};

function actionReducer(state: Items, action: ReducerActions) {
  if (action.type === "RECORD") {
    state.item.type = action.payload!.type;
    state.item.price = action.payload!.price;
  }
  if (state.item.price < 15 && action.type === "UPDATE_YEAR") {
    state.item.price = state.item.price * 10;
    localStorage.setItem("planPrice", state.item.price + "");
  } else if (state.item.price > 15 && action.type === "UPDATE_MONTH") {
    state.item.price = state.item.price / 10;
    localStorage.setItem("planPrice", state.item.price + "");
  }

  return {
    item: state.item,
  };
}

export const ContextProvider = ({ children }: TimersContextProviderProps) => {
  const lenghtLocal = localStorage.getItem("lenght");
  const [plan, planDispatch] = useReducer(actionReducer, item);

  const [total, SetTotal] = useState(0);
  const [isBtn, SetIsBtn] = useState(false);
  const [add, SetAdd] = useState<add[]>([]);
  const [leng, SetLeng] = useState(
    lenghtLocal === null ? "month" : lenghtLocal
  );

  const updateAdd = (val:number) => {
    const updated = add.map((add) => {
      return { ["service"]: add.service, ["price"]: add.price * val };
    });
    SetAdd(updated);
  };

  useEffect(() => {
    if (isBtn) {
      switch (leng) {
        case "year":
          planDispatch({
            type: "UPDATE_YEAR",
          });
          updateAdd(10);
          break;
        case "month":
          planDispatch({
            type: "UPDATE_MONTH",
          });
          updateAdd(0.1);

          break;
      }
    }
    SetIsBtn(false);
  }, [leng]);

  const setPlan = (type: string, price: number): void => {
    planDispatch({
      type: "RECORD",
      payload: { type, price },
    });
  };

  const setLenght = () => {
    SetLeng((prev) => (prev === "month" ? "year" : "month"));
    SetIsBtn(true);
  };

  const setChoseAdd = (
    service: string,
    id: string,
    price: number,
    call: string
  ) => {
    if (call === "add") {
      SetAdd((prev) => [...prev, { service, price }]);
      addId.push(id);
    } else {
      SetAdd(
        add.filter((add) => {
          return add.service != service;
        })
      );
      addId = addId.filter((add) => {
        return add != id;
      });
    }
  };

  const sumTotal = () => {
    const sum = add.reduce((total, thisPlan) => {
      return total + thisPlan.price;
    }, 0);
    SetTotal(sum + plan.item.price);
  };
  return (
    <AuthContext.Provider
      value={{
        setPlan: setPlan,
        choosePlan: plan,
        setLenght: setLenght,
        planLenght: leng,
        setAdd: setChoseAdd,
        chooseAdd: add,
        addId,
        setTotal: sumTotal,
        finalAmount: total,
        formConf: false,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
