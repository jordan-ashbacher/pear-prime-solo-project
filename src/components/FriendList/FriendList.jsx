import './FriendList.css'
import { useSelector } from 'react-redux'
import FriendItem from '../FriendItem/FriendItem'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';

const useStyles = makeStyles(() => ({
    root: {
      width: '100%',
      maxWidth: 360,
    },
    title: {
        color: "#fafafa",
       fontFamily: "'Nunito', sans-serif",
       marginTop: "15px",
       marginBottom: "10px"
      }
  }));
  
const FriendList = () => {

    const classes = useStyles();
    const users = useSelector((store) => store.friends)

    return (
        <>
        <h1 className={classes.title}>Your Friends</h1>
        <List className={classes.root}>
            {users.friendReducer.map((friend) => {
            return <FriendItem key={friend.friend_id} friend={friend} />
            })}
      </List>
      </>
    )
}

export default FriendList