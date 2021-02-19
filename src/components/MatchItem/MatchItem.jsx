import './MatchItem.css'
import { useState } from 'react'
import { useDispatch } from "react-redux"
import { useHistory } from 'react-router-dom'
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from "@material-ui/core/CardContent"
import CardActions from "@material-ui/core/CardActions"
import Typography from "@material-ui/core/Typography"
import Container from "@material-ui/core/Container"
import Button from "@material-ui/core/Button"


const useStyles = makeStyles({
    media: {
      width: "100%",
      maxHeight: "300px",
    },
    container: {
        marginBottom: "10px",
    },
    actions: {
      background: "#fafafa",
      color: "#677F6A"
    },
    content: {
      background: "#fafafa",
      color: "#677F6A"
    }
  })

const MatchItem = ({ match }) => {

    const dispatch = useDispatch()
    const classes = useStyles()
    const history = useHistory()

    const fetchDetails = () => {
      dispatch({ type: "FETCH_DETAILS", payload: match.place_id})
      history.push('/detail')
    }

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
              <CardContent className={classes.content}>
                <Typography gutterBottom variant="h5" component="h2">
                  {match.name}
                </Typography>
                <Typography variant="body2" component="p">
                  {match.address}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions className={classes.actions}>
              <Button 
                variant="outlined" 
                onClick={fetchDetails}
                color="primary"
              >
              More Info
              </Button>
            </CardActions>
          </Card>
        </Container>
      )
}

export default MatchItem