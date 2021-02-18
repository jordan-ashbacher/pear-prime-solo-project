import './UserList.css'
import { useSelector } from 'react-redux'
import UserItem from '../UserItem/UserItem'
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

const UserList = () => {

  const classes = useStyles();
  const users = useSelector((store) => store.friends)

  return (
    <>
      <h1 className={classes.title}>People on Pear</h1>
      <List className={classes.root}>
        {users.friendSearchReducer.map((user) => {
          return <UserItem key={user.id} user={user} />
        })}
      </List>
      </>
  )
}

export default UserList