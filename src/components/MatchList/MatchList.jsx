import './MatchList.css'
import MatchItem from '../MatchItem/MatchItem'
import { useSelector } from "react-redux"

const MatchList = () => {

    const matches = useSelector(store => store.matches)

    return (
        <div className="matchContainer">
          {matches.map((match) => {
            return <MatchItem key={match.id} match={match} />
          })}
        </div>
      
    )
}

export default MatchList