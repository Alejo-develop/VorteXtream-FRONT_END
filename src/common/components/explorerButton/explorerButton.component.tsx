import { useNavigate } from 'react-router-dom'
import './style.css'

const ExplorerButtonComponent = () => {
    const goTo = useNavigate()

    const handleClick = () => {
        goTo('/searchpage')
    }
    
    return (
        <button onClick={handleClick} className='explorer-buttton'>Explorer</button>
    )
}

export default ExplorerButtonComponent