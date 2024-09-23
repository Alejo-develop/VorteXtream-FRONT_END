import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface ButtonAdminProps {
    icono: ReactNode;
    text?: string;
    path: string;
    className: string;
    onClick?: () => void; 
}

const ButtonAdmin = ({ icono, text, path, className, onClick }: ButtonAdminProps) => {
    const goTo = useNavigate();

    const handleClick = () => {
        if (onClick) {
            onClick(); 
        } else {
            goTo(`${path}`);
        }
    };

    return (
        <div>
            <button onClick={handleClick} className={className}>
                {icono}
                {text && <span>{text}</span>}
            </button>
        </div>
    );
};

export default ButtonAdmin;
