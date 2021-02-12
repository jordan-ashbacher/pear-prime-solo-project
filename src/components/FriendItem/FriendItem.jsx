import './FriendItem.css'

const FriendItem = ({ user }) => {


    return (
        <h1>{user.first_name} {user.last_name}</h1>
    )
}

export default FriendItem