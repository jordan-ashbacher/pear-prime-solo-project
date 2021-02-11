import './FriendList.css'

const FriendList = () => {

    // const favorites = useSelector((store) => store.restaurant)
    // console.log(favorites)

  return (
  
      <div className="favoriteContainer">
        {users.map((user, i) => {
          return <FriendItem key={user.id} user={user} />
        })}
      </div>
  )
}

export default FriendList