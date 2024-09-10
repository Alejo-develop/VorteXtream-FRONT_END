import { useNavigate } from 'react-router-dom'
import './style.css'

const WatchNowButtonComponent = () => {
    const goTo = useNavigate()

    const handleClick = () => {
        goTo('/')
    }

    return (
        <button onClick={handleClick} className="button-watch" >Watch Now</button>
    )
}

export default WatchNowButtonComponent