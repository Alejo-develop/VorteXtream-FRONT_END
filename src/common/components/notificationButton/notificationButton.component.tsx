import { BellRing } from "lucide-react";
import "./style.css";
import { useAuth } from "../../../auth/auth.provider";
import { useState } from "react";
import NotificationBoxComponent from "./notificationsAlerts.component";

interface NotificationConfigProps{
  className: string;
}

const NotificationConfigComponent = ({ className }: NotificationConfigProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const auth = useAuth();
  const user = auth.getUser();

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button onClick={handleClick} className="notification-landing-button">
        <BellRing size={"1.7rem"} className="notification-landing-icon" />
      </button>
      {!!isOpen && <NotificationBoxComponent className={className} text="Speed esta chupando el culo del bicho" streamer="Speed" />}
    </div>
  );
};

export default NotificationConfigComponent;
