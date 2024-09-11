import { useState } from "react";
import { useAuth } from "../../../auth/auth.provider";
import "./style.css";
import UserMenuLandingComponent from "../userMenuLanding/userMenuLanding.component";

const UserConfigComponent = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const auth = useAuth();
  const user = auth.getUser();

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
    <button onClick={handleClick} className="settings-porfile-button">
      <img
        src={user.urlprofile}
        alt="profile-img"
        className="img-menu-profile"
      />
    </button>
    {!!isOpen && <div><UserMenuLandingComponent /></div>}

    </div>
  );
};

export default UserConfigComponent;
