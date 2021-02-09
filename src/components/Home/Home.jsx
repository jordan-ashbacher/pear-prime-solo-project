import "./Home.css"
import { useHistory } from "react-router-dom"
import { useState } from "react"
import { useDispatch } from "react-redux"

const Home = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const [location, setLocation] = useState('')

  const updateLocation = (e) => {
    e.preventDefault()
    dispatch({ type: 'UPDATE_LOCATION', payload: location})
    setLocation('')
  }

  const pushToSearch = () => {
    history.push("/search")
  }

  const pushToFriends = () => {
    history.push("/friends")
  }

  const pushToPear = () => {
    history.push("/pear")
  }

  return (
    <div className="container">
      <h1>PEAR</h1>
      <form onSubmit={updateLocation}>
        <input 
          type="text" 
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button type='submit'>Set Location</button>
      </form>
      <button onClick={pushToSearch}>Add Your Favorite Restaurants</button>
      <button onClick={pushToFriends}>Add Your Friends</button>
      <button onClick={pushToPear}>PEAR</button>
    </div>
  )
}

export default Home
