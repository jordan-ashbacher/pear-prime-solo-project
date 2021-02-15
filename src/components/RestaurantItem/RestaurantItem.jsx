import "./RestaurantItem.css"
import { useState } from 'react'
import { useDispatch } from "react-redux"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import Container from "@material-ui/core/Container"
import Snackbar from '@material-ui/core/Snackbar';

const useStyles = makeStyles({
  media: {
    width: "100%",
    maxHeight: "300px",
  },
  container: {
      marginBottom: "10px",
  },
  content: {
    background: "#fafafa",
    color: "#677F6A"
  },
})

// creates card for individual restaurant
const RestaurantItem = ({ restaurant }) => {
  console.log(restaurant.image)
  const dispatch = useDispatch()
  const classes = useStyles()

  const [openSnack, setOpenSnack] = useState(false)

  const addFavorite = () => {
    // console.log(user)
    // console.log(restaurant)
    // dispatch({ type: "ADD_FAVORITE", payload: restaurant })
    dispatch({ type: "ADD_RESTAURANT", payload: restaurant })
    setOpenSnack(true)
  }

  const handleClose = () => {
    setOpenSnack(false)
  }

  return (
    <Container className={classes.container} maxWidth="sm">
      <Card className="card">
        <CardActionArea>
          <img
            src={`/api/search/image/${restaurant.image}`}
            alt=""
            className={classes.media}
          />
          <CardContent className={classes.content}>
            <Typography gutterBottom variant="h5" component="h2">
              {restaurant.name}
            </Typography>
            <Typography variant="body2" component="p">
              {restaurant.address}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button 
            variant="outlined" 
            onClick={addFavorite}
            color="primary"
          >
            Favorite
          </Button>
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center'
            }}
            open={openSnack}
            onClose={handleClose}
            autoHideDuration={3000}
            message="Added to favorites"
          >

          </Snackbar>
        </CardActions>
      </Card>
    </Container>
  )
}

export default RestaurantItem
