import "./Home.css"
import { useHistory, Link } from "react-router-dom"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"

const useStyles = makeStyles({
  button: {
    height: "80px",
    width: "70%",
    background: "#00acb0",
    color: "white",
  },
  updateButton: {
    fontSize: "10px",
  },
})

const Home = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const classes = useStyles()

  const [location, setLocation] = useState("")
  const [locationToggle, setLocationToggle] = useState(false)
  const user = useSelector((store) => store.user)

  const updateLocation = (e) => {
    e.preventDefault()
    dispatch({ type: "UPDATE_LOCATION", payload: location })
    setLocation("")
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
      <h1 className="appTitle">PEAR</h1>
      {locationToggle ? (
        <div className="formContainer">
          <form onSubmit={updateLocation}>
            <input
              type="text"
              className="cityInput"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <Button className="submitButton" type="submit">Set Location</Button>
          </form>
        </div>
      ) : (
        <>
          <h2 className="cityTitle">{user.city}</h2>
          <Button
            onClick={() => setLocationToggle(!locationToggle)}
            className={classes.updateButton}
          >
            Update Location
          </Button>
        </>
      )}
      <div className="buttonContainer">
        <h2>1</h2>
        <Button
          variant="contained"
          className={classes.button}
          onClick={pushToSearch}
        >
          Add Your Favorite Restaurants
        </Button>
        <h2>2</h2>
        <Button
          variant="contained"
          className={classes.button}
          onClick={pushToFriends}
        >
          Add Your Friends
        </Button>
        <h2>3</h2>
        <Button
          variant="contained"
          className={classes.button}
          onClick={pushToPear}
        >
          PEAR
        </Button>
      </div>
    </div>
  )
}

export default Home
