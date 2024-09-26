import { User } from "lucide-react";
import { Lock } from "lucide-react";
import "./styles/loginstyles.css";
import InputLogin from "./components/Input.component";
import { useState } from "react";
import {
  AuthResponse,
  AuthResponseError,
} from "../../../common/interfaces/authResponse.interface";
import { UserPayload } from "../../../common/interfaces/user.interface";
import { useAuth } from "../../../auth/auth.provider";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "../../../common/components/google/googleLogin";
import google from "../../../assets/svg/google.svg";
import useAlert from "../../private/userMenu/components/alert.component";

const LoginComponent = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorResponse, setErrorResponse] = useState<string | any>("");

  const auth = useAuth();
  const goTo = useNavigate();
  const { handleGoogleLogin } = useGoogleLogin();
  const { showAlert } = useAlert();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username || !password) {
      showAlert('error', 'Input Error', 'Please fill in both fields.');
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      if (!response.ok) {
        const errorToJson = (await response.json()) as AuthResponseError;
        const errorMessage =
          errorToJson?.message || "An unexpected error occurred";
        setErrorResponse(errorMessage);
        showAlert('error', 'Login Failed', errorMessage);
        throw new Error(errorMessage);
      }

      const resToJson = (await response.json()) as AuthResponse;

      const token = resToJson.token;
      const user = resToJson.user as UserPayload;
      console.log(user);
      

      // Save session information in a authContext
      auth.saveSessionInfo(user, token, resToJson.isPremium);
      showAlert('success', 'Login Success', `Welcome ${username} :)`);

      if (user.role === 'admin') {
        goTo("/adminpage");
      } else {
        goTo("/"); 
      }

    } catch (err) {
      console.error(err);
      showAlert('error', 'Login Failed', errorResponse);
    }
  };

  return (
    <div className="login-container">
      <h1 className="title-login">Login</h1>

      {!!errorResponse && <p className="error-message">{errorResponse}</p>}
      <form className="login-form" onSubmit={handleSubmit}>
        <InputLogin
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          Icon={<User size={24} />}
        />

        <InputLogin
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          Icon={<Lock size={24} />}
        />

        <div className="remember-forgot">
          <div className="remember-me">
            <input type="checkbox" id="rememberMe" />
            <label htmlFor="rememberMe">Remember Me</label>
          </div>

          <a href="#" className="forgot-password">
            Forgot Password?
          </a>
        </div>

        <button
          className="googleLogin"
          type="button"
          onClick={handleGoogleLogin}
        >
          <img src={google} alt="Google" className="google-icon" />
          Login with Google
        </button>

        <div className="boton-container">
          <button className="login-button" type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginComponent;
