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
import Divider from '@material-ui/core/Divider'



const useStyles = makeStyles({
    fullList: {
        width: 'auto'
    },
    navIcon: {
        color: 'white'
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
        <div className="navContainer">
            <Button onClick={toggleDrawer(true)}><MenuIcon className={classes.navIcon} /></Button>
            <Drawer className={classes.fullList} anchor="bottom" open={state} onClose={toggleDrawer({bottom: false})} onClick={toggleDrawer({bottom: false})} onKeyDown={toggleDrawer({bottom: false})}>
                <List>
                    <Link to={loginLinkData.path}>
                        <ListItem button>
                            <ListItemText primary={loginLinkData.text} />
                        </ListItem>
                        <Divider />
                    </Link>
                    <Link to="/search">
                        <ListItem>
                            <ListItemText primary="Search" />
                        </ListItem>
                        <Divider />
                    </Link>
                    <Link to="/favorites">
                        <ListItem button>
                            <ListItemText primary="Favorites" />
                        </ListItem>
                        <Divider />
                    </Link>
                    <Link to="/friends">
                        <ListItem button>
                            <ListItemText primary="Friends" />
                        </ListItem>
                        <Divider />
                    </Link>
                    <Link to="/pear">
                        <ListItem button>
                            <ListItemText primary="Start Pairing" />
                        </ListItem>
                        <Divider />
                    </Link>
                    <ListItem button onClick={logOut}>
                        <ListItemText primary="Log Out"  />
                    </ListItem>
                </List>
            </Drawer>
        </div>
    )

}

export default NavDrawer