import { useNavigate } from 'react-router-dom'
import './style.css'

const LoginButtonComponent = () => {
    const goTo = useNavigate()

    const handleClick = () => {
        goTo('/register')
    }

    return (
        <button onClick={handleClick} className='button-login'>Login</button>
    )
}

export default LoginButtonComponent