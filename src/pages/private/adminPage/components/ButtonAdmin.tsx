import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface ButtonAdminProps {
    icono: ReactNode;
    text?: string;
    path: string;
    className: string;
}

const ButtonAdmin = ({ icono, text, path, className }: ButtonAdminProps) => {
    const goTo = useNavigate();

    const handleClick = () => {
        goTo(`${path}`);
    };

    return (
        <div>
            <button onClick={handleClick} className={className}>
                {icono}
                {text}
            </button>
        </div>
    );
};

export default ButtonAdmin;
