import "./RestaurantList.css"
import { useSelector } from "react-redux"
import RestaurantItem from "../RestaurantItem/RestaurantItem"

const RestaurantList = () => {
  const searchResults = useSelector((store) => store.search)
  console.log(searchResults)

  return (
    <>
      <h1>Restaurant List</h1>
      {searchResults.map((restaurant, i) => {
        return <RestaurantItem key={i} restaurant={restaurant} />
      })}
    </>
  )
}

export default RestaurantList
