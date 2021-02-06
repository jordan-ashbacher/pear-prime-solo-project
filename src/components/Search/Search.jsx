import "./Search.css"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"

const Search = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const [newQuery, setNewQuery] = useState("")
  
  const submitSearch = (e) => {
      e.preventDefault()
      dispatch({ type: 'SEARCH', payload: newQuery})
      setNewQuery('')
  }

  return (
    <div className="container">
      <h1>Find Your Favorite Restaurants</h1>
      <form onSubmit={submitSearch}>
        <input 
            type="text" 
            value={newQuery}
            onChange={(e) => setNewQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  )
}

export default Search
