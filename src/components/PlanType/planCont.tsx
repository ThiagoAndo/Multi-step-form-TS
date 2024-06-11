
type Plans = {
  txt: string;
  price: number;
  length?: string;
};

export const content = [
  {
    MonthTxt: "$9/mo",
    YearTxt: "$90/yr",
    Month: 9,
    Year: 90,
  },
  {
    MonthTxt: "$12/mo",
    YearTxt: "$120/yr",
    Month: 12,
    Year: 120,
  },
  {
    MonthTxt: "$15/mo",
    YearTxt: "$150/yr",
    Month: 15,
    Year: 150,
  },
];
export const month: Plans[] = [
  {
    txt: "$9/mo",
    price: 9,
    length: "month",
  },
  {
    txt: "$12/mo",
    price: 12,
  },
  {
    txt: "$15/mo",
    price: 15,
  },
];

export const year: Plans[] = [
  {
    txt: "$90/yr",
    price: 90,
    length: "year",
  },
  {
    txt: "$120/yr",
    price: 120,
  },
  {
    txt: "$150/yr",
    price: 150,
  },
];
export default content;