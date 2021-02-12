import "./FriendItem.css"
import {useDispatch} from 'react-redux'
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"
import ListItemText from "@material-ui/core/ListItemText"
import ListSubheader from "@material-ui/core/ListSubheader"
import AccountIcon from "@material-ui/icons/AccountCircle"
import Button from '@material-ui/core/Button'
import { actionChannel } from "redux-saga/effects"

const FriendItem = ({ user }) => {
    const dispatch = useDispatch()
    const fullName = `${user.first_name} ${user.last_name}`

    const addFriend = () => {
        dispatch({ type: 'ADD_FRIEND', payload: user.id})
    } 

  return (
    <ListItem>
      <ListItemIcon>
        <AccountIcon />
      </ListItemIcon>
      <ListItemText primary={fullName} secondary={user.username} />
      <ListItemSecondaryAction>
        <Button onClick={addFriend}>Add Friend</Button>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

export default FriendItem
