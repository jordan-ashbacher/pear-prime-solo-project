import './RestaurantItem.css'
import {useDispatch, useSelector} from 'react-redux'

// creates card for individual restaurant
const RestaurantItem = ({ restaurant }) => {
    console.log(restaurant.image)
    const dispatch = useDispatch()

    // const user = useSelector(store => store.user)

    const addFavorite = () => {
        // console.log(user)
        // console.log(restaurant)
        dispatch({ type: 'ADD_FAVORITE', payload: restaurant})
        dispatch({ type: 'ADD_RESTAURANT', payload: restaurant})
    }

    return (
        <>
        <div>
            <img src={`/api/search/image/${restaurant.image}`} alt=""/>
        </div>
        <h2>{restaurant.name}</h2>
        <button onClick={addFavorite}>Favorite</button>
        </>
        
    )
}

export default RestaurantItem