import './Favorites.css'
import FavoriteList from '../FavoriteList/FavoriteList'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const Favorites = () => {
    const dispatch = useDispatch()
    useEffect(() => dispatch({ type: 'FETCH_RESTAURANTS'}), [])

    return (
        <div className="favoritesContainer">
            <h1 className="favoritesTitle">Favorites</h1>
            <FavoriteList />
        </div>
        
    )
}

export default Favorites