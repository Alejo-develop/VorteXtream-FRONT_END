import { useEffect, useState } from "react";
import { useAuth } from "../../../auth/auth.provider";
import ButtonMenuUserComponent from "../../../pages/private/userMenu/components/buttonMenuUser.component";
import IfPremum from "./sonComponents/premiumOrNot.component";
import "./style.css";
import { SubscriptionResponse } from "../../interfaces/subcription.interface";

const PremiumContainerComponent = () => {
  const auth = useAuth();
  const user = auth.getUser();
  const token = auth.getToken()

  const [subscriptionUser, setSubcriptionUser] = useState<SubscriptionResponse>()

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const subscription = await fetch(`http://localhost:3000/vortextream/subcriptions/${user.id}`, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })

        if(!subscription) throw new Error('Subscription not found')

        const subscriptionToJson = await subscription.json() as SubscriptionResponse
        setSubcriptionUser(subscriptionToJson)
        console.log(subscriptionToJson);
        
      }catch (err) {
        console.error(err)
      }
    }

    fetchSubscription()
  }, [user, token])

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
          <p className="duration-subcription-info">{subscriptionUser?.duration}</p>
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
