import "./UserItem.css"
import {useDispatch} from 'react-redux'
import { makeStyles } from "@material-ui/core/styles"
import { useState } from 'react'
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"
import ListItemText from "@material-ui/core/ListItemText"
import AccountIcon from "@material-ui/icons/AccountCircle"
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Snackbar from '@material-ui/core/Snackbar'

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

const FriendItem = ({ user }) => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const fullName = `${user.first_name} ${user.last_name}`

    const [openSnack, setOpenSnack] = useState(false)

    const addFriend = () => {
        dispatch({ type: 'ADD_FRIEND', payload: user.id})
        setOpenSnack(true)
    } 

    const handleClose = () => {
      setOpenSnack(false)
    }

  return (
    <>
    <ListItem className={classes.item}>
      <ListItemIcon>
        <AccountIcon className={classes.icon} />
      </ListItemIcon>
      <ListItemText primary={
        <Typography variant="body1" className={classes.primary}>
          {fullName} 
        </Typography>}
        secondary={
        <Typography component="p" display="block" className={classes.secondary}>
          {user.username}
        </Typography>}
         />
      <ListItemSecondaryAction>
        <Button onClick={addFriend} className={classes.button} variant="outlined">Add Friend</Button>
      </ListItemSecondaryAction>
    </ListItem>
    <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center'
            }}
            open={openSnack}
            onClose={handleClose}
            autoHideDuration={3000}
            message="Added a friend!"
          >
      </Snackbar>
    <Divider />
    </>
  )
}

export default FriendItem
