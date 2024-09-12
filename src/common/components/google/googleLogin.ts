import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
// import { useNavigate } from "react-router-dom"; 

export const handleGoogleLogin = async (): Promise<void> => {
  const provider = new GoogleAuthProvider();

  try {
    const credentials = await signInWithPopup(auth, provider);

    const token = await credentials.user.getIdToken();

    console.log("Token de usuario:", token);

    sessionStorage.setItem('authToken', token);

    const userName = await credentials.user.displayName;
    const userEmail = await credentials.user.email;
    console.log("Nombre de usuario:", userName);
    console.log("Correo electrónico:", userEmail);

    // navigate('/');

  } catch (err) {
    console.error("Error signing in with Google", err);
    return;
  }
};
