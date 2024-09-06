import { User } from "lucide-react";
import { Lock } from "lucide-react";
import "./loginstyles.css";
import InputLogin from "./components/Input.component";

const LoginForm = () => {
  return (
    <div className="login-container">
      <h1 className="title-login">Login</h1>
      <form className="login-form">
        {/* input de username */}

        <InputLogin placeholder="Username" Icon={<User size={24} />} />
        {/* input de password */}

        <InputLogin placeholder="Password" Icon={<Lock size={24} />} />
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
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
