import './DetailPage.css'
import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from '@material-ui/core/CardMedia'
import Container from "@material-ui/core/Container"
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'

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
    }
})

const DetailPage = () => {
    const dispatch = useDispatch()
    const classes = useStyles()

    const restaurant = useSelector(store => store.details)


    return (
        <div className={classes.detailContainer}>
        <h1 className={classes.title}>{restaurant.name}</h1>
        <Link>
            <h2 className={classes.h2}>{restaurant.address}</h2>
        </Link>
        <h2 className={classes.h2}>{restaurant.phone}</h2>
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
        </Container>
        </div>
    )

}

export default DetailPage