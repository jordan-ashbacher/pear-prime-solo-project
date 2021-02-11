import "./FavoriteList.css"
import FavoriteItem from "../FavoriteItem/FavoriteItem"
import { useSelector } from "react-redux"

const FavoriteList = () => {
  const favorites = useSelector((store) => store.restaurant)
  console.log(favorites)

  return (
    <>
      <h1>Favorite Restaurants</h1>
      <div className="favoriteContainer">
        {favorites.map((favorite, i) => {
          return <FavoriteItem key={favorite.id} favorite={favorite} />
        })}
      </div>
    </>
  )
}

export default FavoriteList
