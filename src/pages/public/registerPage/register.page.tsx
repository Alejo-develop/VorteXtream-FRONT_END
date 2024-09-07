import smallLogo from '../../../assets/img/smallLogo.png'
import { useState } from "react";
import LoginComponent from "./LoginForm.component";
import "./styles/index.css";
import RegisterComponent from "./registerForm.component";

export default function RegisterPage() {
  const [isLogin, setIsLogin] = useState(true);

  const putRegister = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsLogin(!isLogin)
  }

  const RenderForm = isLogin ? LoginComponent : RegisterComponent

  return (
    <div className="registerPage-containet">
      <div className="form-container">
        <div className={`form-modal ${isLogin ? 'form-modal' : 'form-modal-translate'}`}>
            <RenderForm />
        </div>

        <div className={`modal-div ${isLogin ? 'modal-div' : 'register-div'}`}>
          <img src={smallLogo} className='logo'/>
          <h1>{isLogin ? "Don't have an account?" : "Already have an account?"}</h1>
          <button className="button-modal" onClick={putRegister}>
            {isLogin ? "Register!" : "Login!"}
          </button>
        </div>
      </div>
    </div>
  );
}
