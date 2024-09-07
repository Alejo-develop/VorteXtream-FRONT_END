import { ChangeEvent, ReactNode } from "react";

interface LoginProps {
  placeholder: string;
  Icon: ReactNode; 
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const InputLogin = ({ placeholder, Icon, onChange }: LoginProps) => {
  return (
    <div className="input-group">
      {/* Renderizar el icono pasado como prop */}
      <span className="input-icon">{Icon}</span>
      {/* Renderizar el input con el placeholder recibido como prop */}
      <input type="text" placeholder={placeholder} className="input-field" onChange={onChange}/>
    </div>
  );
};

export default InputLogin;
