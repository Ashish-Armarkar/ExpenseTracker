import { Alert, Collapse } from "@mui/material";

const AlertMessage = ({ activeAlert, setActiveAlert }) => {
  return (
    <Collapse in={activeAlert.status} unmountOnExit>
      <Alert
        severity={activeAlert.severity}
        onClose={() => {
          setActiveAlert({ status: false, severity: null, message: null });
        }}
        sx={{
          position: "fixed",
          top: "5%",
          left: "30%",
          zIndex: 9999,
          width: "40%",
        }}
      >
        {activeAlert.message}
      </Alert>
    </Collapse>
  );
};

export default AlertMessage;
