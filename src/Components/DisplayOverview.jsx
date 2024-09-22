import { useContext } from "react";
import style from "./DisplayOverview.module.css";
import { TransactionContext } from "../Store";

const DisplayOverview = () => {
  const { balanceAmount, totalExpense, totalIncome } =
    useContext(TransactionContext);

  return (
    <>
      <div className={`${style.display}`}>
        <div className={`${style.balance}`}>
          <h4>Your Balance</h4>
          <h1>${balanceAmount}</h1>
        </div>
        <div className={`${style.sepration}`}>
          <div className={`${style.income}`}>
            <p>INCOME</p>
            <h2>${totalIncome}</h2>
          </div>
          <div className={`${style.expense}`}>
            <p>EXPENSE</p>
            <h2>${totalExpense}</h2>
          </div>
        </div>
      </div>
    </>
  );
};
export default DisplayOverview;
