import './FriendList.css'
import { useSelector } from 'react-redux'
import FriendItem from '../FriendItem/FriendItem'

const FriendList = () => {

    const users = useSelector((store) => store.allUsers)

  return (
  
      <div className="friendSearchContainer">
        {users.map((user) => {
          return <FriendItem key={user.id} user={user} />
        })}
      </div>
  )
}

export default FriendList