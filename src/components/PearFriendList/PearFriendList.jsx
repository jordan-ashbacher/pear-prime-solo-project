import './PearFriendList.css'
import { useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
    },
  }));

const PearFriendList = () => {

    const dispatch = useDispatch()
    useEffect(() => dispatch({ type: 'FETCH_FRIENDS'}), [])

    const classes = useStyles();
    // const users = useSelector((store) => store.friendSearch)

    return (
      <h1>PEAR FRIEND LIST</h1>
      //   <List className={classes.root}>
      //       {users.map((user) => {
      //       return <FriendItem key={user.id} user={user} />
      //       })}
      // </List>
    )
}

export default PearFriendList