import "./Home.css"
import { useHistory } from "react-router-dom"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

const Home = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const [location, setLocation] = useState('')
  const [locationToggle, setLocationToggle] = useState(false)
  const user = useSelector(store => store.user)

  const updateLocation = (e) => {
    e.preventDefault()
    dispatch({ type: 'UPDATE_LOCATION', payload: location})
    setLocation('')
    setLocationToggle(!locationToggle)
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
      {locationToggle ? (
        <form onSubmit={updateLocation}>
        <input 
          type="text" 
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button type='submit'>Set Location</button>
      </form>
      ) : (
      <>
      <h2>{user.city}</h2>
      <p onClick={() => setLocationToggle(!locationToggle)}>Update Location</p>
      </>
      )}
      <button onClick={pushToSearch}>Add Your Favorite Restaurants</button>
      <button onClick={pushToFriends}>Add Your Friends</button>
      <button onClick={pushToPear}>PEAR</button>
    </div>
  )
}

export default Home
