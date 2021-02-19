import './DetailPage.css'
import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardMedia from '@material-ui/core/CardMedia'
import Container from "@material-ui/core/Container"
import Link from '@material-ui/core/Link'
import Button from "@material-ui/core/Button"
import Snackbar from '@material-ui/core/Snackbar'

const useStyles = makeStyles({
    media: {
      width: "100%",
      maxHeight: "300px",
    },
    container: {
        marginBottom: "10px",
        marginTop: "5px"
    },
    content: {
      background: "#fafafa",
      color: "#677F6A"
    },
    card: {
        marginBottom: "10px"
    },
    title: {
        color: "#fafafa",
        fontFamily: "'Nunito Sans', sans-serif",
        marginBottom: '15px', 
        marginTop: 0,
    },
    detailContainer: {
        display: "flex",
        flexFlow: "column",
        alignItems: "center",
    },
    h2: {
        fontSize: "14px",
        color: "#fafafa",
        marginTop: 0,
        marginBottom: "15px"
    },
    button: {
        color: "#fafafa",
        marginBottom: "15px",
        borderColor: "#fafafa"
    }
})

const DetailPage = () => {
    const dispatch = useDispatch()
    const classes = useStyles()

    const restaurant = useSelector(store => store.details)

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
        <div className={classes.detailContainer}>
        <h1 className={classes.title}>{restaurant.name}</h1>
        <Link
            href={restaurant.website} 
            target="_blank" rel="noopener" 
        >
            <h2 className={classes.h2}>{restaurant.website}</h2>
        </Link>
        <h2 className={classes.h2}>{restaurant.address}</h2>
        <h2 className={classes.h2}>{restaurant.phone}</h2>
        <Button 
            variant="outlined" 
            onClick={addFavorite}
            className={classes.button}
          >
            Favorite
          </Button>
        <Container className={classes.container} maxWidth="sm">
            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia 
                        component="img"
                        src={`/api/search/image/${restaurant.photo1}`}
                        alt=""
                        className={classes.media}
                    />
                    {/* <CardContent className={classes.content}>
                        <Typography variant="body2" component="p">
                            {restaurant.address}
                        </Typography>
                        <Typography variant="body2" component="p">
                            {restaurant.website}
                        </Typography>
                        <Typography variant="body2" component="p">
                            {restaurant.phone}
                        </Typography>
                    </CardContent> */}
                </CardActionArea>
            </Card>
            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia 
                        component="img"
                        src={`/api/search/image/${restaurant.photo2}`}
                        alt=""
                        className={classes.media}
                    />
                </CardActionArea>
            </Card>
            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia 
                        component="img"
                        src={`/api/search/image/${restaurant.photo3}`}
                        alt=""
                        className={classes.media}
                    />
                </CardActionArea>
            </Card>
            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia 
                        component="img"
                        src={`/api/search/image/${restaurant.photo4}`}
                        alt=""
                        className={classes.media}
                    />
                </CardActionArea>
            </Card>
            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia 
                        component="img"
                        src={`/api/search/image/${restaurant.photo5}`}
                        alt=""
                        className={classes.media}
                    />
                </CardActionArea>
            </Card>
            <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center'
            }}
            open={openSnack}
            onClose={handleClose}
            autoHideDuration={3000}
            message="Added to favorites"
          ></Snackbar>
        </Container>
        </div>
    )

}

export default DetailPage