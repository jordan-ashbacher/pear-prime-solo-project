import "./Search.css"
import RestaurantList from "../RestaurantList/RestaurantList"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import Divider from '@material-ui/core/Divider'
import SearchIcon from '@material-ui/icons/Search'
import ClearIcon from '@material-ui/icons/Clear'

const useStyles = makeStyles({
  input: {
    color: "primary",
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

const Search = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const classes = useStyles()

  const [newQuery, setNewQuery] = useState("")
  

  const submitSearch = (e) => {
    e.preventDefault()
    dispatch({ type: "SEARCH", payload: newQuery })
    setNewQuery("")
  }

  const clearSearch = () => {
    setNewQuery("")
  }

  return (
    <div className="searchContainer">
      <h1 className="searchTitle">Find Your Favorites</h1>
      <form className="searchForm" onSubmit={submitSearch}>
        <InputBase
          type="text"
          variant="outlined"
          className={classes.input}
          value={newQuery}
          placeholder="Young Joni, sushi..."
          onChange={(e) => setNewQuery(e.target.value)}
          // inputProps={{classes: {input: classes.input}}}
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
      <RestaurantList />
    </div>
  )
}

export default Search
