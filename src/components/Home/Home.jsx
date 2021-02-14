import "./Home.css"
import { useHistory, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"

const useStyles = makeStyles({
  button: {
    height: "80px",
    width: "100%",
    color: "white",
    letterSpacing: '.1rem'
  },
  updateButton: {
    fontSize: "10px",
    marginTop: "5px",
    marginBottom: "10px"
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
    <div className="homeContainer">
      <h1 className="appTitle">PEAR</h1>
      <h2 className="subhead">Match Your Tastes</h2>
      <div className="mainContainer">
      {locationToggle ? (
        <div className="formContainer">
          <form onSubmit={updateLocation}>
            <input
              type="text"
              className="cityInput"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <Button 
              className="submitButton" 
              type="submit" 
              variant="outlined"
              color="primary"
            >
              Set Location
            </Button>
          </form>
        </div>
      ) : (
        <div className="locationContainer">
          <p className="locationLabel">Pairing restaurants in</p>
          <h2 className="cityTitle">{user.current_location}</h2>
          <Button
            onClick={() => setLocationToggle(!locationToggle)}
            className={classes.updateButton}
            variant="outlined"
            color="primary"
          >
            Update Location
          </Button>
        </div>
      )}
      <div className="buttonContainer">
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={pushToSearch}
        >
          Add Your Favorite Restaurants
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={pushToFriends}
        >
          Add Your Friends
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={pushToPear}
        >
          Start Pairing
        </Button>
        </div>
      </div>
    </div>
  )
}

export default Home
