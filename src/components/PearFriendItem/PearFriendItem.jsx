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
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'


const useStyles = makeStyles({
  item: {
    color: "#677F6A",
    background: "#fafafa",
  },
  button: {
    color: "#677F6A"
  },
  icon: {
    color: "#677F6A"
  },
  primary: {
    color: "#677F6A"
  },
  secondary: {
    color: "#677F6A", 
    fontSize: "0.875rem"
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
      <>
    <ListItem key={friend.id} className={classes.item}>
      <ListItemIcon>
        <AccountIcon className={classes.icon} />
      </ListItemIcon>
      <ListItemText primary={
        <Typography variant="body1" className={classes.primary}>
          {fullName} 
        </Typography>}
        secondary={
          <Typography component="p" display="block" className={classes.secondary}>
            {friend.username}
          </Typography>}
         />
      <ListItemSecondaryAction>
        <Button className={classes.button} onClick={findMatches}>Pair</Button>
      </ListItemSecondaryAction>
    </ListItem>
    <Divider />
    </>
  )
}

export default PearFriendItem
