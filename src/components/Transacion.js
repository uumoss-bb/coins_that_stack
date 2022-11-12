import { ListItem, ListItemLabel } from "baseui/list";
import uuid from '../workers/uuid'

const Transaction = ({ props: { source, title, transaction, balance = "?", date } }) => {
  return (
    <ListItem key={uuid()}>
      <ListItemLabel >{source}</ListItemLabel>
      <ListItemLabel >{transaction}</ListItemLabel>
      <ListItemLabel >{title}</ListItemLabel>
    </ListItem>
  );
}

export default Transaction