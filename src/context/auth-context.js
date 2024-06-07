import React, { useState, useReducer, useEffect } from "react";

const AuthContext = React.createContext({
  formConf: false,
  choosePlan: {},
  setPlan: (type, price) => {},
  planLenght: "",
  setLenght: () => {},
  chooseAdd: [],
  addId: [],
  setAdd: (type, price) => {},
  setTotal: () => {},
  finalAmount: 0,
});

let addId = [];

function actionReducer(state, action) {
  if (action.type === "record") {
    state.item.type = action.payload.type;
    state.item.price = action.payload.price;
  }
  if (state.item.price < 15 && action.type.up === "update year") {
    state.item.price = state.item.price * 10;
    localStorage.setItem("planPrice", state.item.price);
  } else if (state.item.price > 15 && action.type.up === "update month") {
    state.item.price = state.item.price / 10;
    localStorage.setItem("planPrice", state.item.price);
  }

  return {
    item: state.item,
  };
}

export const ContextProvider = (props) => {
  const lenghtLocal = localStorage.getItem("lenght");
  const [plan, planDispatch] = useReducer(actionReducer, {
    item: {
      type: "",
      price: 0,
    },
  });

  const [total, SetTotal] = useState(0);
  const [isBtn, SetIsBtn] = useState(false);
  const [add, SetAdd] = useState([]);
  const [leng, SetLeng] = useState(
    lenghtLocal === null ? "month" : lenghtLocal
  );

  const updateAdd = (val) => {
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
            type: { up: "update year" },
          });
          updateAdd(10);
          break;
        case "month":
          planDispatch({
            type: { up: "update month" },
          });
          updateAdd(0.1);

          break;
      }
    }
    SetIsBtn(false);
  }, [leng]);

  const setPlan = (type, price) => {
    planDispatch({
      type: "record",
      payload: { type, price },
    });
  };

  const setLenght = () => {
    SetLeng((prev) => (prev === "month" ? "year" : "month"));
    SetIsBtn(true);
  };

  const setChoseAdd = (service, id, price, call) => {
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
        choosePlan: plan.item,
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
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
