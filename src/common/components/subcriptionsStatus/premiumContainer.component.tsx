import { useAuth } from "../../../auth/auth.provider";
import ButtonMenuUserComponent from "../../../pages/private/userMenu/components/buttonMenuUser.component";
import IfPremum from "./sonComponents/premiumOrNot.component";
import "./style.css";

const PremiumContainerComponent = () => {
  const auth = useAuth();
  const user = auth.getUser();

  return (
    <div className="container-subcription-status">
      <div className="sticker-info-premium">
        <IfPremum
          textColor="rgb(121, 103, 3)"
          text={`${user.username} you are a Premium!`}
          color="linear-gradient(to right,#bf953f,#fcf6ba,#b38728,#fbf5b7,#aa771c)"
          width="17rem"
          height="3.5rem"
        />
      </div>
      <div className="container-duration-canelSubcription">
        <div>
          <h3 className="title-duration-subcription">Duration:</h3>
          <p className="duration-subcription-info">3 Months</p>
        </div>

        <div className="cancel-subcription-container">
          <ButtonMenuUserComponent
            size="170"
            height="40"
            text="Cancel Subcription :("
            fontweight="0.8"
          />
        </div>
      </div>
    </div>
  );
};

export default PremiumContainerComponent;
