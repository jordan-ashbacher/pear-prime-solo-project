import "./Home.css"
import {useHistory} from 'react-router-dom'

const Home = () => {
    const history = useHistory()

    const pushToSearch = () => {
        history.push('/search')
    }

    const pushToFriends = () => {
        history.push('/friends')
    }

    const pushToPear = () => {
        history.push('/pear')
    }

  return (
    <div className="container">
      <h1>PEAR</h1>
      <button onClick={pushToSearch}>Add Your Favorite Restaurants</button>
      <button onClick={pushToFriends}>Add Your Friends</button>
      <button onClick={pushToPear}>PEAR</button>
    </div>
  )
}

export default Home
