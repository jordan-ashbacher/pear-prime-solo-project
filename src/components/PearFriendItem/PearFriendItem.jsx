import "./PearFriendItem.css"
import { useDispatch } from "react-redux"
import { makeStyles } from "@material-ui/core/styles"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"
import ListItemText from "@material-ui/core/ListItemText"
import AccountIcon from "@material-ui/icons/AccountCircle"
import Button from '@material-ui/core/Button'

const useStyles = makeStyles({
  item: {
    background: "#fafafa",
    width: "100%"
  }
})

const PearFriendItem = ({ friend }) => {

  const classes = useStyles()
  
    const fullName = `${friend.first_name} ${friend.last_name}`
  
    return (
    <ListItem className={classes.item}>
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
