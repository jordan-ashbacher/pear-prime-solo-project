import "./Search.css"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import RestaurantList from "../RestaurantList/RestaurantList"
import Button from '@material-ui/core/Button'

const Search = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const [newQuery, setNewQuery] = useState("")

  const submitSearch = (e) => {
    e.preventDefault()
    dispatch({ type: "SEARCH", payload: newQuery })
    setNewQuery("")
  }

  return (
    <div className="searchContainer">
      <form onSubmit={submitSearch}>
        <input
          type="text"
          className="searchInput"
          value={newQuery}
          placeholder="Find your favorite restaurants"
          onChange={(e) => setNewQuery(e.target.value)}
        />
        <Button className="searchButton" type="submit">Search</Button>
      </form>
      <RestaurantList />
    </div>
  )
}

export default Search
