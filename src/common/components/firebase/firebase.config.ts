
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBO24ZOFlFIvpxGHuWUdiNxYNzOGx_TB1c",
  authDomain: "vortextream-ed5f6.firebaseapp.com",
  projectId: "vortextream-ed5f6",
  storageBucket: "vortextream-ed5f6.appspot.com",
  messagingSenderId: "99068148975",
  appId: "1:99068148975:web:583b401d2b10b486eaef1a"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)