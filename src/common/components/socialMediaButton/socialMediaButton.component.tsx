import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface SocialMediaProps{
    className: string;
    icon: ReactNode;
    name: string;
    navigate?:string
}

const ButttonFooterComponent = ({ className, icon, name, navigate }: SocialMediaProps) => {
    const goTo = useNavigate()
    
    const handleClick = () => {
        goTo(`/${navigate}`)
    }
    
    return(
        <button className={className}>
            {icon}
            <h2 className="social-media-name">{name}</h2>
        </button>
    )
}

export default ButttonFooterComponent