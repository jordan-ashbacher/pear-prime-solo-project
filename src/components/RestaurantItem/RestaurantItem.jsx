import './RestaurantItem.css'

// creates card for individual restaurant
const RestaurantItem = ({ restaurant }) => {
    console.log(restaurant.image)

    return (
        <>
        <div>
            <img src={`/api/search/image/${restaurant.image}`} alt=""/>
        </div>
        <h2>{restaurant.name}</h2>
        <button>Favorite</button>
        </>
        
    )
}

export default RestaurantItem