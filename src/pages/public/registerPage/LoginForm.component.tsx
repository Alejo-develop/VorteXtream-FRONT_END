import { User } from "lucide-react";
import { Lock } from "lucide-react";
import "./styles/loginstyles.css";
import InputLogin from "./components/Input.component";
import { useState } from "react";
import { AuthResponse, AuthResponseError } from "../../../common/interfaces/authResponse.interface";
import { useAuth } from "../../../auth/auth.provider";
import { UserPayload } from "../../../common/interfaces/user.interface";
import { useNavigate } from "react-router-dom";

const LoginComponent = () => {
  const [ username, setUsername ] = useState<string>('')
  const [ password, setPassword ] = useState<string>('')
  const [ errorResponse, setErrorResponse ] = useState('')

  const auth = useAuth()
  const goTo = useNavigate()
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    try {
      const response = await fetch('http://localhost:3000/vortextream/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password
        })
      })    

      if(!response.ok){
        const errorToJson = await response.json() as AuthResponseError
        const errorMessage = errorToJson?.body?.error || 'An unexpected error occurred';
        setErrorResponse(errorMessage);
  
        throw new Error(errorMessage);
      }

      const resToJson = await response.json() as AuthResponse
      console.log(resToJson);
      const token = resToJson.token
      const user = resToJson.user as UserPayload

      
      auth.saveSessionInfo(user, token)
      goTo('/')
    } catch (err) {
      console.log(err);
      setErrorResponse('An error occurred. Please try again.');
    }
  }


  return (
    <div className="login-container">
      <h1 className="title-login">Login</h1>

      {!!errorResponse && <div className="error-message">{errorResponse}</div>}
      <form className="login-form" onSubmit={handleSubmit}>
        {/* input de username */}

        <InputLogin type="text" onChange={(e) => setUsername(e.target.value)} placeholder="Username" Icon={<User size={24} />} />
        {/* input de password */}

        <InputLogin type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" Icon={<Lock size={24} />} />
        {/* input de remember me y forgot password */}

        <div className="remember-forgot">
          <div className="remember-me">
            <input type="checkbox" id="rememberMe" />
            <label htmlFor="rememberMe">Remember Me</label>
          </div>

          <a href="#" className="forgot-password">
            Forgot Password?
          </a>
        </div>

        {/* botón de login */}

        <div className="boton-container">
          <button className="login-button" type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default LoginComponent;
