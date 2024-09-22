import { createContext, useState, useEffect } from "react";

export const TransactionContext = createContext(null);

const TransactionProvider = ({ children }) => {
  const [TransactionData, setTransactionData] = useState(() => {
    const storedData = localStorage.getItem("TransactionData");
    return storedData ? JSON.parse(storedData) : [];
  });
  const [uniqueTransactionId, setUniqueTransactionId] = useState(
    TransactionData.length
  );
  const [balanceAmount, setBalanceAmount] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [activeAlert, setActiveAlert] = useState({});

  useEffect(() => {
    const updatedBalance = TransactionData.reduce((acc, transaction) => {
      return transaction.paymentStatus === "Credit"
        ? acc + Number(transaction.amount)
        : acc - Number(transaction.amount);
    }, 0);

    const incomeOfAllTime = TransactionData.reduce((acc, transaction) => {
      return transaction.paymentStatus === "Credit"
        ? acc + Number(transaction.amount)
        : acc;
    }, 0);

    const expenseOfAllTime = TransactionData.reduce((acc, transaction) => {
      return transaction.paymentStatus === "Debit"
        ? acc + Number(transaction.amount)
        : acc;
    }, 0);

    setBalanceAmount(updatedBalance);
    setTotalExpense(expenseOfAllTime);
    setTotalIncome(incomeOfAllTime);
  }, [TransactionData]);

  useEffect(() => {
    localStorage.setItem("TransactionData", JSON.stringify(TransactionData));
  }, [TransactionData]);

  const handleAddTransaction = (forWhat, amount, paymentStatus) => {
    const count = uniqueTransactionId + 1;
    setUniqueTransactionId(count);

    const currentDate = new Date();
    const date = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const min = String(currentDate.getMinutes()).padStart(2, "0");
    const hr = String(currentDate.getHours()).padStart(2, "0");
    const currentDateTime = `${date}/${month}/${currentDate.getFullYear()} - ${hr}:${min}`;

    if (!forWhat || !amount) {
      setActiveAlert({
        status: true,
        severity: "error",
        message: "You didn't fill required fields!",
      });
      return;
    }

    if (paymentStatus === "Debit" && amount <= balanceAmount) {
      const newData = {
        id: count,
        forWhat,
        amount,
        paymentStatus,
        currentDateTime,
      };
      setTransactionData((prevData) => [newData, ...prevData]);
      setActiveAlert({
        status: true,
        severity: "success",
        message: "Expense!",
      });
    } else if (paymentStatus === "Credit") {
      const newData = {
        id: count,
        forWhat,
        amount,
        paymentStatus,
        currentDateTime,
      };
      setTransactionData((prevData) => [newData, ...prevData]);
      setActiveAlert({ status: true, severity: "success", message: "Income!" });
    } else {
      setActiveAlert({
        status: true,
        severity: "error",
        message: "Insufficient Fund!",
      });
    }

    setTimeout(() => {
      setActiveAlert({ status: false, severity: null, message: null });
    }, 3000);
  };

  return (
    <TransactionContext.Provider
      value={{
        TransactionData,
        handleAddTransaction,
        balanceAmount,
        totalExpense,
        totalIncome,
        activeAlert,
        setActiveAlert,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export default TransactionProvider;
