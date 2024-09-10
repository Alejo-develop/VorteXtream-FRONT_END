import { LogOut } from "lucide-react";
import { useAuth } from "../../../auth/auth.provider";
import { useNavigate } from "react-router-dom";

const LogOutComponentButton = () => {
    const auth = useAuth()
    const goTo = useNavigate()

    const handleClick = () => {
        auth.signOut()
        goTo('/login')
    }
  
    return (
    <button type="submit" className="icon-link-logOut" onClick={handleClick}>
      <LogOut />
    </button>
  );
};

export default LogOutComponentButton
