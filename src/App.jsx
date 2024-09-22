import React, { useContext, Suspense } from "react";
import { Container } from "@mui/material";
import TransactionProvider, { TransactionContext } from "./Store";
import "./App.css";

const Header = React.lazy(() => import("./Components/Header"));
const History = React.lazy(() => import("./Components/History"));
const NewTransaction = React.lazy(() => import("./Components/NewTransaction"));
const DisplayOverview = React.lazy(() =>
  import("./Components/DisplayOverview")
);
const AlertMessage = React.lazy(() => import("./Components/AlertMessage"));

function App() {
  const { activeAlert, setActiveAlert } = useContext(TransactionContext);
  return (
    <div className="main-container">
      <Suspense fallback={<div>Loading...</div>}>
        <Container maxWidth="sm" className="App">
          {activeAlert.status == true && (
            <AlertMessage
              setActiveAlert={setActiveAlert}
              activeAlert={activeAlert}
            />
          )}
          <div>
            <Header />
            <DisplayOverview />
            <NewTransaction />
          </div>
        </Container>
        <Container maxWidth="sm" style={{ padding: "10px" }}>
          <History />
        </Container>
      </Suspense>
    </div>
  );
}

export default App;
