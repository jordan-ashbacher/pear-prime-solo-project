import "./RestaurantList.css"
import { useSelector } from "react-redux"
import RestaurantItem from "../RestaurantItem/RestaurantItem"

const RestaurantList = () => {
  const searchResults = useSelector((store) => store.search)
  console.log(searchResults)

  return (
    <div className="restaurantContainer">
      {searchResults.map((restaurant, i) => {
        return <RestaurantItem key={i} restaurant={restaurant} />
      })}
    </div>
  )
}

export default RestaurantList
