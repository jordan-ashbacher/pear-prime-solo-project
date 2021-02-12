import './NavDrawer.css'
import LogOutButton from '../LogOutButton/LogOutButton'
import { makeStyles } from '@material-ui/core/styles'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import MenuIcon from '@material-ui/icons/Menu'
import Button from '@material-ui/core/Button'
import Drawer from '@material-ui/core/Drawer'



const useStyles = makeStyles({
    fullList: {
        width: 'auto'
    }
})

const NavDrawer = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()
    const [state, setState] = useState(false)
    const user = useSelector((store) => store.user);

    const toggleDrawer = (open) => (e) => {
        if (e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
            return;
        }
        
        setState(!state)
    }

    let loginLinkData = {
      path: '/login',
      text: 'Login / Register',
    };
  
    if (user.id != null) {
      loginLinkData.path = '/home';
      loginLinkData.text = 'Home';
    }

    const logOut = () => {
        dispatch({ type: 'LOGOUT' })
        history.push('/')

    }

    return (
        <div>
            <Button onClick={toggleDrawer(true)}><MenuIcon /></Button>
            <Drawer className={classes.fullList} anchor="bottom" open={state} onClose={toggleDrawer({bottom: false})} onClick={toggleDrawer({bottom: false})} onKeyDown={toggleDrawer({bottom: false})}>
                <List>
                    <ListItem button>
                        <Link to={loginLinkData.path}>
                            <ListItemText primary={loginLinkData.text} />
                        </Link>
                    </ListItem>
                    <ListItem>
                        <Link to="/search">
                            <ListItemText primary="Search" />
                        </Link>
                    </ListItem>
                    <ListItem button>
                        <Link to="/favorites">
                            <ListItemText primary="Favorites" />
                        </Link>
                    </ListItem>
                    <ListItem button>
                        <Link to="/friends">
                            <ListItemText primary="Friends" />
                        </Link>
                    </ListItem>
                    <ListItem button>
                        <Link to="/pear">
                            <ListItemText primary="Pear" />
                        </Link>
                    </ListItem>
                    <ListItem button onClick={logOut}>
                        <ListItemText primary="Log Out"  />
                    </ListItem>
                </List>
            </Drawer>
        </div>
    )

}

export default NavDrawer