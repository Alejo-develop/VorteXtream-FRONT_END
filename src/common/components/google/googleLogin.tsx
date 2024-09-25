import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../auth/auth.provider";
import { UserPayload } from "../../interfaces/user.interface";

export const useGoogleLogin = () => {
  const navigate = useNavigate();
  const authProvider = useAuth();

  const handleGoogleLogin = async (): Promise<void> => {
    const provider = new GoogleAuthProvider();

    try {
      const credentials = await signInWithPopup(auth, provider);
      const googleToken = await credentials.user.getIdToken();
      const googleUserName = credentials.user.displayName;
      const googleEmail = credentials.user.email;

      console.log("Token de usuario de Google:", googleToken,
        "Nombre de usuario:", googleUserName,
        "Correo electrónico:", googleEmail
      );

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/google-auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          username: googleUserName,
          email: googleEmail,
        }),
      });

      if (!response.ok) {
        const errorToJson = await response.json();
        console.log(errorToJson)
        const errorMessage = errorToJson?.error || 'An unexpected error occurred';
        console.error(errorMessage);
        alert(`Login failed: ${errorMessage}`);
        return;
      }

      const resToJson = await response.json();
      const token = resToJson.token;
      const user = resToJson.user as UserPayload;

      authProvider.saveSessionInfo(user, token, resToJson.isPremium);

      navigate('/');

    } catch (err) {
      console.error("Error signing in with Google or fetching backend", err);
      // Optionally, show a user-friendly alert or notification
      alert('An error occurred during the login process. Please try again.');
    }
  };

  return { handleGoogleLogin };
};
