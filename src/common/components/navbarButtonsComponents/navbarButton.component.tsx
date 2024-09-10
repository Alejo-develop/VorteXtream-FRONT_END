import { ReactNode } from "react"
import { useNavigate } from "react-router-dom"

interface ButtonProps {
    path: string
    icono: ReactNode
    className: string

}

export const ButtonNavBa = ({path, icono, className}: ButtonProps) => {
    const goTo = useNavigate()
    
    const handleClick = () => {
        goTo(`${path}`)
    }
    return (
        <button onClick={handleClick} className={className}>
            {icono}

        </button>
    )

}