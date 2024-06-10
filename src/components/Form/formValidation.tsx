import { Inf } from "../botton/FormControl";

type Check = {
  [name: string]: (a: string) => boolean | Inf;
  email: (a: string) => boolean | Inf;
  phone: (a: string) => boolean | Inf;
};

export const formCheck: Check = {
  name: (name: string) => {
    const regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
    if (!regName.test(name)) {
      return {
        msg: "Make sure to fill in Your Name and Last Name. You can copy and paste the text below",
        inf: "Stephen King",
      };
    } else {
      return true;
    }
  },
  email: (email: string) => {
    const pass = email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    if (pass) {
      return true;
    } else {
      return {
        msg: "Make sure to enter a valid email. You can copy and paste the text below",
        inf: "stephenking@lorem.com",
      };
    }
  },

  phone: (number: string) => {
    const valueExp = new RegExp(
      "^\\+[3]{1}[5]{1}[3]{1}-[0-9]{2}-[0-9]{3}-[0-9]{4}$"
    );
    if (valueExp.test(number)) {
      return true;
    } else {
      return {
        msg: "Make sure to enter a valid Phone Number. You can copy and paste the text below",
        inf: "+353-83-567-8901",
      };
    }
  },
};
