import './MatchPage.css'
import MatchList from '../MatchList/MatchList'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    button: {
      color: '#fafafa',
      border: "1px solid #fafafa"
    }
  })

const MatchPage = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const classes = useStyles()
    useEffect(() => dispatch({ type: 'FETCH_MATCHES'}), [])

    const pairAgain = () => {
        history.push('/pear')
    }

    
    return (
        <div className="matchContainer">
            <h1 className="matchTitle">Your Matches</h1>
            <MatchList />
            <Button className={classes.button} variant="outlined" onClick={pairAgain}>Pair With A Different Friend</Button>
        </div>
    )
}

export default MatchPage