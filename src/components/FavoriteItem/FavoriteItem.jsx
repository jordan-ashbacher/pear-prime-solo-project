import './FavoriteItem.css'
import { useState } from 'react'
import { useDispatch } from "react-redux"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from '@material-ui/core/CardMedia'
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import Container from "@material-ui/core/Container"
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Create'
import SaveIcon from '@material-ui/icons/Save'
import Link from '@material-ui/core/Link'


// sets Material-UI styles
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
    actions: {
      background: "#fafafa",
      color: "#677F6A"
    },
    restaurantTitle: {
      textTransform: 'uppercase',
      fontSize: '20px',
      fontWeight: 'bolder',
      letterSpacing: '.1rem'
    },
    link: {
      display: "block",
      marginTop: "5px"
    },
    card: {
      maxWidth: "300px"
    }
  })

const FavoriteItem = ({ favorite }) => {
    const dispatch = useDispatch()
    const classes = useStyles()

    //State variable for notes dialog box, text area and note content
    const [open, setOpen] = useState(false)
    const [edit, setEdit] = useState(false)
    const [rating, setRating] = useState(favorite.rating)
    const [noteText, setNoteText] = useState(favorite.notes)

    //Sets state for notes dialog box
    const handleOpen = () => {
      setOpen(true)
    }
    
    //Sets state for notes dialog box and edit page when dialog box is closed
    const handleClose = () => {
      setOpen(false)
      setEdit(false)
    }

    const toggleEdit = () => {
      setEdit(!edit)
    }

    //Dispatches new note content with id from favorite table
    const saveNote = () => {
      const newNote = {
        id: favorite.favorite_id,
        note: noteText
      }
      console.log(newNote)
      dispatch({ type: 'EDIT_NOTE', payload: newNote})
      setEdit(!edit)
    }

    // Dispatch to remove restaurant from favorite table
    const removeFavorite = () => {
        dispatch({ type: 'REMOVE_FAVORITE', payload: favorite.favorite_id})
    }

    return (
      <Container className={classes.container} maxWidth="sm">
      <Card className="card">
        <CardActionArea>
          <CardMedia
            component="img"
            src={`/api/search/image/${favorite.photo2}`}
            alt=""
            className={classes.media}
          />
          <CardContent className={classes.content}>
            <Typography gutterBottom className={classes.restaurantTitle} >
              {favorite.name}
            </Typography>
            <Typography component="p">
              {favorite.address}
            </Typography>
            <Link 
              href={favorite.website} 
              target="_blank" rel="noopener" 
              className={classes.link}
            >
              {favorite.website}
            </Link>
          </CardContent>
        </CardActionArea>
        <CardActions className={classes.actions}>
          <Button 
            variant="outlined" 
            color="primary" 
            onClick={removeFavorite}
          >
            Remove
          </Button>
          <Button 
            variant="outlined" 
            onClick={handleOpen}
            color="primary"
          >
            Notes
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
            fullWidth={true} 
          >
            <DialogTitle id="form-dialog-title">Notes</DialogTitle>
            {!edit ? (
              <>
              <DialogContentText>
              {favorite.notes}
              </DialogContentText>
              <DialogActions>
                <Button onClick={toggleEdit} color="primary"><EditIcon /></Button>
              </DialogActions>
              </>
            ) : (
              <>
              <TextareaAutosize
                rowsMin={5}
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
              />
              <Button 
                variant='outlined' 
                color="primary"
                onClick={saveNote}
              >
                <SaveIcon />
              </Button>
              </>
            )}
              
          </Dialog>
        </CardActions>
      </Card>
    </Container>
    )
}

export default FavoriteItem