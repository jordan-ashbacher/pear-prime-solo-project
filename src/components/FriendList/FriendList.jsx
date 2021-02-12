import './FriendList.css'
import { useSelector } from 'react-redux'
import FriendItem from '../FriendItem/FriendItem'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
  },
}));

const FriendList = () => {

  const classes = useStyles();
  const users = useSelector((store) => store.friends)

  return (
  
      <List className={classes.root}>
        {users.friendSearchReducer.map((user) => {
          return <FriendItem key={user.id} user={user} />
        })}
      </List>
  )
}

export default FriendList