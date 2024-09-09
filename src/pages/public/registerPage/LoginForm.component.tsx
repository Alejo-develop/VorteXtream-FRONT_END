import { jwtDecode } from "jwt-decode";
import { User } from "lucide-react";
import { Lock } from "lucide-react";
import "./styles/loginstyles.css";
import InputLogin from "./components/Input.component";
import { useState } from "react";
import { AuthResponse, AuthResponseError } from "../../../common/interfaces/authResponse.interface";
import { useAuth } from "../../../auth/auth.provider";
import { UserPayload } from "../../../common/interfaces/user.interface";

const LoginComponent = () => {
  const [ username, setUsername ] = useState<string>(' ')
  const [ password, setPassword ] = useState<string>(' ')
  const [ errorResponse, setErrorResponse ] = useState(' ')

  const auth = useAuth()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    try {
      const response = await fetch('http://miurl.com', {
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
        setErrorResponse(errorToJson.body.error)
        throw new Error (errorToJson.body.error)
      }

      const resToJson = await response.json() as AuthResponse
      const token = resToJson.body.token

    } catch (err) {
      console.log(err);
    }
  }


  return (
    <div className="login-container">
      <h1 className="title-login">Login</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        {/* input de username */}

        <InputLogin onChange={(e) => setUsername(e.target.value)} placeholder="Username" Icon={<User size={24} />} />
        {/* input de password */}

        <InputLogin onChange={(e) => setPassword(e.target.value)} placeholder="Password" Icon={<Lock size={24} />} />
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
