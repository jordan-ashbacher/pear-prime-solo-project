import './FriendPage.css'
import FriendList from '../FriendList/FriendList'
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import Divider from '@material-ui/core/Divider'
import SearchIcon from '@material-ui/icons/Search'
import ClearIcon from '@material-ui/icons/Clear'

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
    color: "#fafafa",
  },
  divider: {
    height: "30px",
    background: "#fafafa"
  }
})

const FriendPage = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const classes = useStyles()

    useEffect(() => dispatch({ type: 'FETCH_USERS' }), [])

    
    const [userQuery, setUserQuery] = useState('')
    
    const searchUsers = (e) => {
       dispatch({ type: 'SEARCH_USERS', payload: userQuery})
       setUserQuery('')
    }

    const clearSearch = () => {
      setNewQuery("")
    }
    
    return (
        <div className="friendContainer">
          <h1 className="friendTitle">Add Friends On Pear</h1>
          <form className="friendForm" onSubmit={searchUsers}>
          <InputBase
            type="text"
            variant="outlined"
            className={classes.input}
            value={userQuery}
            placeholder="Name, username..."
            onChange={(e) => setUserQuery(e.target.value)}
            inputProps={{'aria-label': 'Young Joni, sushi...'}}
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
        
        </div>
    )
}

export default FriendPage