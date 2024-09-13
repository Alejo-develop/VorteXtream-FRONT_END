import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../auth/auth.provider";

export const useGoogleLogin = () => {
  const navigate = useNavigate();
  const authProvider = useAuth();

  const handleGoogleLogin = async (): Promise<void> => {
    const provider = new GoogleAuthProvider();

    try {
      const credentials = await signInWithPopup(auth, provider);
      const googleToken = await credentials.user.getIdToken();
      const googleUserName = await credentials.user.displayName;
      const googleEmail = await credentials.user.email;

      console.log("Token de usuario de Google:", googleToken);

      // Envía el token a tu backend para autenticar al usuario
      // const response = await fetch("http://localhost:3000/vortextream/auth/login", {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ 
      //     username: googleUserName,
      //     email: googleEmail
      //    }),
      // });

      // if (!response.ok) {
      //   const errorToJson = await response.json();
      //   const errorMessage = errorToJson?.error || 'An unexpected error occurred';
      //   console.error(errorMessage);
      //   return;
      // }

      // const resToJson = await response.json();
      // const sessionToken = resToJson.token;
      // const user = resToJson.user;

      sessionStorage.setItem('authToken', googleToken);
      // authProvider.saveSessionInfo(googleUserName, googleToken);

      navigate('/');

    } catch (err) {
      console.error("Error signing in with Google or fetching backend", err);
    }
  };

  return { handleGoogleLogin };
};
