import { List, Container } from "@mui/material";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

import CreditTransaction from "./CreditTransaction";
import DebitTransaction from "./DebitTransaction";
import { TransactionContext } from "../Store";
import { useContext, useEffect, useState } from "react";
import style from "./History.module.css";

const History = () => {
  const { TransactionData } = useContext(TransactionContext);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date("09/01/2024"));

  const filterTransactionsByDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const formattedDate = `${day}/${month}/${date.getFullYear()}`;

    const filtered = TransactionData.filter((data) => {
      const transactionDate = data.currentDateTime.substring(0, 10);
      return transactionDate >= formattedDate;
    });

    setFilteredData(filtered);
  };

  useEffect(() => {
    filterTransactionsByDate(selectedDate);
  }, [TransactionData, selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    filterTransactionsByDate(date);
  };

  return (
    <div className={`${style.mainDiv}`}>
      <center>
        <h3>Payment History</h3>
        <hr />
        <div>
          <div className="date-picker-container">
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="MMMM d, yyyy"
              className="border p-2 rounded"
            />
          </div>
        </div>
      </center>
      <Container fixed>
        <center className={`${style.Box}`}>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            style={{ backgroundColor: "transparent" }}
          >
            {filteredData && filteredData.length > 0 ? (
              filteredData.map((data) =>
                data.paymentStatus === "Credit" ? (
                  <CreditTransaction key={data.id} data={data} />
                ) : (
                  <DebitTransaction key={data.id} data={data} />
                )
              )
            ) : (
              <center>- No Transaction -</center>
            )}
          </List>
        </center>
      </Container>
    </div>
  );
};

export default History;
