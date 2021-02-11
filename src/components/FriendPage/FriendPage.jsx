import './FriendPage.css'
import '../FriendList/FriendList'
import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import Button from '@material-ui/core/Button'


const FriendPage = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => dispatch({type: 'FETCH_ALL_USERS'}), [])

    const [friendQuery, setFriendQuery] = useState('')

    const submitSearch = (e) => {
        e.preventDefault()
    }


    
    return (
        <div className="friendContainer">
        <form onSubmit={submitSearch}>
          <input
            type="text"
            className="searchInput"
            value={friendQuery}
            placeholder="Find your friends"
            onChange={(e) => setFriendQuery(e.target.value)}
          />
          <Button className="searchButton" type="submit">Search</Button>
        </form>
        
        </div>
    )
}

export default FriendPage