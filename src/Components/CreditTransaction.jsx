import { ListItem, ListItemText, ListItemAvatar, Avatar } from "@mui/material";
import CallReceivedIcon from "@mui/icons-material/CallReceived";

const CreditTransaction = ({ data }) => {
  return (
    <>
      <ListItem
        style={{
          height: "40px",
          border: "1px solid gray",
          boxShadow: " 1px 1px 1px grey",
        }}
      >
        <ListItemAvatar>
          <Avatar
            style={{ background: "green", width: "30px", height: "30px" }}
          >
            <CallReceivedIcon />
          </Avatar>
        </ListItemAvatar>
        <h3>${data.amount}</h3>
        <ListItemText
          primary={`${data.forWhat}`}
          secondary={`${data.currentDateTime}`}
          style={{ textAlign: "right" }}
          primaryTypographyProps={{ style: { fontSize: "14px" } }}
          secondaryTypographyProps={{ style: { fontSize: "10px" } }}
        />
      </ListItem>
      <br />
    </>
  );
};

export default CreditTransaction;
