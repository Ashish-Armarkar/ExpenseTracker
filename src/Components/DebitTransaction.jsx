import { ListItem, ListItemText, ListItemAvatar, Avatar } from "@mui/material";
import CallMadeIcon from "@mui/icons-material/CallMade";

const DebitTransaction = ({ data }) => {
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
          <Avatar style={{ background: "red", width: "30px", height: "30px" }}>
            <CallMadeIcon />
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
export default DebitTransaction;
