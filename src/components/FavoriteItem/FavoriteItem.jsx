import './FavoriteItem.css'
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
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Create'
import SaveIcon from '@material-ui/icons/Save'

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

    const [open, setOpen] = useState(false)
    const [edit, setEdit] = useState(false)
    const [noteText, setNoteText] = useState(favorite.notes)

    const handleOpen = () => {
      setOpen(true)
    }

    const handleClose = () => {
      setOpen(false)
      setEdit(false)
    }

    const toggleEdit = () => {
      setEdit(!edit)
    }

    const saveNote = () => {
      const newNote = {
        id: favorite.favorite_id,
        note: noteText
      }
      console.log(newNote)
      dispatch({ type: 'EDIT_NOTE', payload: newNote})
      setEdit(!edit)
    }

    const removeFavorite = () => {
        dispatch({ type: 'REMOVE_FAVORITE', payload: favorite.id})
    }

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
          <Button variant="outlined" color="primary" onClick={removeFavorite}>
            Remove
          </Button>
          <Button 
            variant="outlined" 
            color="primary"
            onClick={handleOpen}
          >
            Notes
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"  
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