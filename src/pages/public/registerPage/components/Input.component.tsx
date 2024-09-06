import { ReactNode } from "react";

interface LoginProps {
  placeholder: string;
  Icon: ReactNode; 
}

const InputLogin = ({ placeholder, Icon }: LoginProps) => {
  return (
    <div className="input-group">
      {/* Renderizar el icono pasado como prop */}
      <span className="input-icon">{Icon}</span>
      {/* Renderizar el input con el placeholder recibido como prop */}
      <input type="text" placeholder={placeholder} className="input-field" />
    </div>
  );
};

export default InputLogin;
