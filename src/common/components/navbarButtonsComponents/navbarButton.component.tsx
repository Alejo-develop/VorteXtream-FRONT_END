import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import ButtonUserMenuLandingComponent from "../userMenuLanding/buttonUserMenuLanding.component";

interface ButtonProps {
  path: string;
  icono: ReactNode;
  className: string;
  text: string;
}

export const ButtonNavBa = ({ path, icono, className, text }: ButtonProps) => {
  const goTo = useNavigate();

  const handleClick = () => {
    goTo(`${path}`);
  };
  return (
    <div className="icon-container">
      <button onClick={handleClick} className={className}>
        {icono}
      </button>

      <ButtonUserMenuLandingComponent color="2F3241" path={path}  text={text} width="12.5"/>
    </div>
  );
};
