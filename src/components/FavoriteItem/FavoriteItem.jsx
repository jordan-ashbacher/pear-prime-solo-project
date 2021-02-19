import './FavoriteItem.css'
import { useState } from 'react'
import { useDispatch } from "react-redux"
import { makeStyles } from "@material-ui/core/styles"
import { useHistory } from 'react-router-dom'
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from '@material-ui/core/CardMedia'
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import Container from "@material-ui/core/Container"
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Create'
import SaveIcon from '@material-ui/icons/Save'
import Link from '@material-ui/core/Link'
import ClearIcon from '@material-ui/icons/Clear'
import Divider from '@material-ui/core/Divider'


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
    },
    dialog: {
      color: "#677F6A",
      paddingLeft: "10px",
      paddingRight: "10px"
    },
    notes: {
      color: "#677F6A",
      border: "1px solid #677F6A",
      font: "400 16px 'Nunito Sans'"
    },
    divider: {
      height: "30px",
      background: "#677F6A"
    }
  })

const FavoriteItem = ({ favorite }) => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const history = useHistory()

    //State variable for notes dialog box, text area and note content
    const [open, setOpen] = useState(false)
    const [edit, setEdit] = useState(false)
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


  const fetchDetails = () => {
    dispatch({ type: "FETCH_DETAILS", payload: favorite.place_id})
    history.push('/detail')
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
            onClick={fetchDetails}
            color="primary"
          >
            More Info
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
            {!edit ? (
              <>
              <DialogTitle className={classes.dialog} id="form-dialog-title">Notes</DialogTitle>
              <DialogContentText className={classes.dialog}>
              {favorite.notes}
              </DialogContentText>
              <DialogActions>
                <Button onClick={toggleEdit} color="primary"><EditIcon /></Button>
                <Divider className={classes.divider} orientation="vertical" />
                <Button onClick={handleClose} color="primary"><ClearIcon /></Button>
              </DialogActions>
              </>
            ) : (
              <>
              <TextField 
                placeholder="Notes"
                multiline
                variant="outlined"
                rows={15}
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                className={classes.notes}
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