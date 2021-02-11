import './FavoriteItem.css'
import { useDispatch } from "react-redux"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import Container from "@material-ui/core/Container"

const useStyles = makeStyles({
    media: {
      width: "100%",
      maxHeight: "300px",
    },
    container: {
        marginBottom: "10px",
    },
  })

const FavoriteItem = ({ favorite }) => {
    const dispatch = useDispatch()
    const classes = useStyles()

    return (
        <Container className={classes.container} maxWidth="sm">
      <Card className="card">
        <CardActionArea>
          <img
            src={`/api/search/image/${favorite.photo2}`}
            alt=""
            className={classes.media}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {favorite.name}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button variant="contained">
            Remove
          </Button>
        </CardActions>
      </Card>
    </Container>
    )
}

export default FavoriteItem