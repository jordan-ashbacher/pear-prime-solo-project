import "./Pear.css"
import "../PearFriendList/PearFriendList"
import PearFriendList from "../PearFriendList/PearFriendList"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { makeStyles } from '@material-ui/core/styles'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import Divider from '@material-ui/core/Divider'
import SearchIcon from '@material-ui/icons/Search'
import ClearIcon from '@material-ui/icons/Clear'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles({
    input: {
      color: "#fafafa",
      width: "70%",
      height: "50px",
      padding: "5px"
    },
    iconButton: {
      height: "50px",
      padding: "10px",
      color: "#fafafa",
    },
    divider: {
      height: "30px",
      background: "#fafafa"
    },
    button: {
      color: '#fafafa',
      border: "1px solid #fafafa"
    }
  })

const Pear = () => {

    const dispatch = useDispatch()
    const classes = useStyles()
    
    useEffect(() => dispatch({ type: 'FETCH_FRIENDS'}), [])

    const [friendQuery, setFriendQuery] = useState('')
    const [searchToggle, setSearchToggle] = useState(false)

    const searchFriends = (e) => {
        e.preventDefault()
        dispatch({ type: 'SEARCH_FRIENDS', payload: friendQuery})
        setSearchToggle(true)
        setFriendQuery('')
    }

    const clearSearch = () => {
        setFriendQuery('')
    }

    const showFriends = () => {
      dispatch({ type: 'FETCH_FRIENDS'})
      setSearchToggle(false)
    }
  
    return (
    <div className="pairContainer">
      <h1 className="pairTitle">Match Your Tastes </h1>
      <form className="pairForm" onSubmit={searchFriends}>
        <InputBase
          type="text"
          variant="outlined"
          className={classes.input}
          value={friendQuery}
          placeholder="Name, username..."
          onChange={(e) => setFriendQuery(e.target.value)}
          inputProps={{ "aria-label": "Name, username..." }}
        />
        <IconButton
          type="submit"
          aria-label="search"
          className={classes.iconButton}
        >
          <SearchIcon />
        </IconButton>
        <Divider className={classes.divider} orientation="vertical" />
        <IconButton
          aria-label="clear"
          className={classes.iconButton}
          onClick={clearSearch}
        >
          <ClearIcon />
        </IconButton>
      </form>
      <PearFriendList />
      {searchToggle ? (
        <Button className={classes.button} variant="outlined" onClick={showFriends}>Show All Friends</Button>
      ) : (
        <>
        </>
      )}
    </div>
  )
}

export default Pear
