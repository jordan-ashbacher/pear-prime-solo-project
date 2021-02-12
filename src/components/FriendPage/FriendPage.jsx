import './FriendPage.css'
import FriendList from '../FriendList/FriendList'
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import Button from '@material-ui/core/Button'


const FriendPage = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => dispatch({ type: 'FETCH_USERS' }), [])

    
    const [userQuery, setUserQuery] = useState('')
    
    const searchUsers = (e) => {
       dispatch({ type: 'SEARCH_USERS', payload: userQuery})
       setUserQuery('')
    }


    
    return (
        <div className="friendContainer">
          <form onSubmit={searchUsers}>
          <input
            type="text"
            className="searchInput"
            value={userQuery}
            placeholder="Find your friends"
            onChange={(e) => setUserQuery(e.target.value)}
          />
          <Button className="searchButton" type="submit">Search</Button>
          </form>
        <FriendList />
        
        </div>
    )
}

export default FriendPage