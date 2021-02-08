import './RestaurantItem.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const RestaurantItem = ({ restaurant }) => {
    console.log(restaurant)
    const dispatch = useDispatch()

    useEffect(() => dispatch({ type: 'FETCH_IMAGE', payload: restaurant}), [])

    const details = useSelector(store => store.details)


    return (
        <>
        <h2>{restaurant.name}</h2>
        <div>
            <img src={details.imageURL} alt=""/>
        </div>
        
        </>
        
    )
}

export default RestaurantItem