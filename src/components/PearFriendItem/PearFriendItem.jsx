import "./PearFriendItem.css"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"
import ListItemText from "@material-ui/core/ListItemText"
import ListSubheader from "@material-ui/core/ListSubheader"
import AccountIcon from "@material-ui/icons/AccountCircle"
import Button from '@material-ui/core/Button'
import { actionChannel } from "redux-saga/effects"

const PearFriendItem = ({ friend }) => {
  
    const fullName = `${friend.first_name} ${friend.last_name}`
  
    return (
    <ListItem>
      <ListItemIcon>
        <AccountIcon />
      </ListItemIcon>
      <ListItemText primary={fullName} secondary={friend.username} />
      <ListItemSecondaryAction>
        <Button>Pair</Button>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

export default PearFriendItem
