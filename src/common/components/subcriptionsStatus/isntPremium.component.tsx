import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../auth/auth.provider";
import ButtonMenuUserComponent from "../../../pages/private/userMenu/components/buttonMenuUser.component";
import IfPremum from "./sonComponents/premiumOrNot.component";
import "./style.css";

const IsNotPremiumContainer = () => {
    const auth = useAuth()
    const user = auth.getUser()
    const goTo = useNavigate()

    const handleClick = () =>{
        goTo('/checkout')
    }
  
    return (
    <div className="container-subcription-status">
      <div className="sticker-info-premium">
        <IfPremum
        textColor="white"
          text={`${user.username} you aren't Premium :(`}
          color="rgb(50, 0, 0)"
          width="17rem"
          height="3.5rem"
        />
      </div>
      <div className="container-duration-canelSubcription">

        <div className="subcription-checkout-container">
          <ButtonMenuUserComponent
            size="170"
            height="40"
            text="Subscribe!"
            fontweight="0.8"
            onClick={handleClick}
          />
        </div>
      </div>
    </div>
  );
};

export default IsNotPremiumContainer;