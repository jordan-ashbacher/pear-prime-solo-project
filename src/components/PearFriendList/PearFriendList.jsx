import './PearFriendList.css'
import PearFriendItem from '../PearFriendItem/PearFriendItem'
import { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      margin: "0"
    },
  }));

const PearFriendList = () => {

    

    const friends = useSelector(store => store.friends)


    const classes = useStyles();
    // const users = useSelector((store) => store.friendSearch)

    return (       
        <List className={classes.root}>
            {friends.friendReducer.map((friend) => {
            return <PearFriendItem key={friend.user_id} friend={friend} />
            })}
      </List>
    )
}

export default PearFriendList