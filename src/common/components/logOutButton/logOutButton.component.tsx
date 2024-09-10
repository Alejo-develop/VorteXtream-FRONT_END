import { LogOut } from "lucide-react";
import { useAuth } from "../../../auth/auth.provider";

const LogOutComponentButton = () => {
    const auth = useAuth()

    const handleClick = () => {
        auth.signOut()
    }
  
    return (
    <button type="submit" className="icon-link-logOut" onClick={handleClick}>
      <LogOut />
    </button>
  );
};

export default LogOutComponentButton
