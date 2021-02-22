import './UserPage.css'
import UserList from '../UserList/UserList'
import FriendList from '../FriendList/FriendList'
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
    color: "white",
    width: "70%",
    height: "50px",
    padding: "5px"
  },
  iconButton: {
    height: "50px",
    padding: "10px",
    color: "##677F6A",
  },
  divider: {
    height: "30px",
    background: "#677F6A"
  },
  button: {
    color: '#677F6A',
    border: "1px solid #677F6A"
  }
})

const UserPage = () => {
    const dispatch = useDispatch()
    const classes = useStyles()

    useEffect(() => dispatch({ type: 'FETCH_USERS' }), [])
    useEffect(() => dispatch({ type: 'FETCH_FRIENDS'}), [])

    
    const [userQuery, setUserQuery] = useState('')
    const [searchToggle, setSearchToggle] = useState(false)
    
    const searchUsers = (e) => {
       dispatch({ type: 'SEARCH_USERS', payload: userQuery})
       setSearchToggle(true)
       setUserQuery('')
    }

    const clearSearch = () => {
      setNewQuery("")
    }

    const showFriends = () => {
      dispatch({ type: 'FETCH_USERS'})
      setSearchToggle(false)
    }
    
    return (
      <div className="friendContainer">
        {searchToggle ? (
        <>
          <h1 className="friendTitle">Add Friends On Pear</h1>
          <form className="friendForm" onSubmit={searchUsers}>
          <InputBase
            type="text"
            variant="outlined"
            className={classes.input}
            value={userQuery}
            placeholder="Name, username..."
            onChange={(e) => setUserQuery(e.target.value)}
            inputProps={{'aria-label': 'Name, username...'}}
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
          <UserList />
          <Button className={classes.button} variant="outlined" onClick={showFriends}>Show All Friends</Button>
        </>
      ) : (
        <>
          <h1 className="friendTitle">Add Friends On Pear</h1>
          <form className="friendForm" onSubmit={searchUsers}>
          <InputBase
            type="text"
            variant="outlined"
            className={classes.input}
            value={userQuery}
            placeholder="Name, username..."
            onChange={(e) => setUserQuery(e.target.value)}
            inputProps={{'aria-label': 'Name, username...'}}
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
        <FriendList />
        <UserList />
        </>
      )}
     </div>   
    )
}

export default UserPage