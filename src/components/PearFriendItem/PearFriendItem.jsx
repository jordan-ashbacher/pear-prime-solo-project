import "./PearFriendItem.css"
import { useDispatch } from "react-redux"
import { useHistory } from 'react-router-dom'
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
  const dispatch = useDispatch()
  const history = useHistory()
  
    const fullName = `${friend.first_name} ${friend.last_name}`

    const findMatches = () => {
      console.log(friend.id)
      dispatch({ type: 'FIND_MATCHES', payload: friend.id})
      history.push('/matches')
    }
  
    return (
    <ListItem key={friend.id} className={classes.item}>
      <ListItemIcon>
        <AccountIcon />
      </ListItemIcon>
      <ListItemText primary={fullName} secondary={friend.username} />
      <ListItemSecondaryAction>
        <Button onClick={findMatches}>Pair</Button>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

export default PearFriendItem
