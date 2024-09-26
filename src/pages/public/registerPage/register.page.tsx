import smallLogo from "../../../assets/img/smallLogo.png"; {/* Logotipo of VorteXtream  */}
import { useState } from "react";
import LoginComponent from "./LoginForm.component";
import "./styles/index.css";
import RegisterComponent from "./registerForm.component"; 
import { useAuth } from "../../../auth/auth.provider";
import { Navigate } from "react-router-dom";
import "./styles/style.circle.css"


interface IRegisterProps {
  isRegister?: boolean
}

export default function RegisterPage({ isRegister } : IRegisterProps) {
  const [isLogin, setIsLogin] = useState(!isRegister); 

  const auth = useAuth()
  
  if(auth.isAuthenticated){
    return <Navigate  to={'/'} />
  }

  const putRegister = (e: React.FormEvent<HTMLButtonElement>) => { 
    e.preventDefault();
    setIsLogin(!isLogin);
  };

  const RenderForm = isLogin ? LoginComponent : RegisterComponent; 

  return (
    <div className="registerPage-containet">
      <div className="form-container">

        <div
          className={`form-modal ${ 
            isLogin ? "form-modal" : "form-modal-translate"
          }`}
        >
          <RenderForm onChange={setIsLogin}  /> 
        </div>

        <div className={`container-circle ${isLogin ? "form-modal" : "form-modal-translate"}`}>
          <div className="circle">
            <div className={`semicircle ${isLogin ? "modal-div" : "register-div"}`}></div>
          </div>
        </div>

        <div className={`modal-div ${isLogin ? "modal-div" : "register-div"}`}> 
          <img src={smallLogo} className="logo" />
          <h1>
            {isLogin ? "Don't have an account?" : "Already have an account?"} 
          </h1>
          <button className="button-modal" onClick={putRegister}>  
            {isLogin ? "Register!" : "Login!"} 
          </button>
        </div>
      </div>
    </div>
  );
}
