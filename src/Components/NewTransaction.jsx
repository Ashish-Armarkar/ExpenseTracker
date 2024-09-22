import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Button,
  TextField,
} from "@mui/material";

import style from "./NewTransaction.module.css";
import { useContext, useRef } from "react";

import { TransactionContext } from "../Store";

const NewTransaction = () => {
  let forWhat = useRef();
  let amount = useRef();
  const { handleAddTransaction } = useContext(TransactionContext);

  return (
    <>
      <center className="box">
        <h3>Add new transaction</h3>
        <hr />
        <div className={`${style.form}`}>
          <TextField
            id="outlined-basic"
            label="Text"
            variant="outlined"
            className={`${style.input}`}
            inputRef={forWhat}
          />

          <TextField
            id="outlined-basic"
            label="Amount"
            variant="outlined"
            className={`${style.input}`}
            inputRef={amount}
            type="number"
          />
        </div>
        <div className={`${style.ActionButtons}`}>
          <Button
            variant="contained"
            color="success"
            className={`${style.button}`}
            onClick={() => {
              handleAddTransaction(
                forWhat.current.value,
                amount.current.value,
                "Credit"
              );
              forWhat.current.value = "";
              amount.current.value = "";
            }}
          >
            Credit
          </Button>
          <Button
            variant="contained"
            color="error"
            className={`${style.button}`}
            onClick={() => {
              handleAddTransaction(
                forWhat.current.value,
                amount.current.value,
                "Debit"
              );

              forWhat.current.value = "";
              amount.current.value = "";
            }}
          >
            Debit
          </Button>
        </div>
      </center>
    </>
  );
};
export default NewTransaction;
