import './MatchPage.css'
import MatchList from '../MatchList/MatchList'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const MatchPage = () => {
    const dispatch = useDispatch()
    useEffect(() => dispatch({ type: 'FETCH_MATCHES'}), [])

    
    return (
        <div className="matchContainer">
            <h1 className="matchTitle">Your Matches</h1>
            <MatchList />
        </div>
    )
}

export default MatchPage