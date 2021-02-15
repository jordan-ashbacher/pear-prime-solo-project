import './MatchItem.css'
import { useState } from 'react'
import { useDispatch } from "react-redux"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from "@material-ui/core/CardContent"
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

const MatchItem = ({ match }) => {

    const dispatch = useDispatch()
    const classes = useStyles()

    return (
        <Container className={classes.container} maxWidth="sm">
          <Card className="card">
            <CardActionArea>
              <CardMedia
                component="img"
                src={`/api/search/image/${match.photo3}`}
                alt=""
                className={classes.media}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {match.name}
                </Typography>
                <Typography variant="body2" component="p">
                  {match.address}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Container>
      )
}

export default MatchItem