import { Crown, Frown } from "lucide-react";
import PlanSubscriptionCardComponent from "./components/planCard.component";
import "./style.css";
import FormCheckout from "./components/checkout.component";
import { useAuth } from "../../../auth/auth.provider";
import { useEffect, useState } from "react";
import { PayMethodResponse } from "../../../common/interfaces/paymethod.interface";

export default function CheckoutPage() {
  const [payMethodInfo, setPayMethodInfo] = useState<PayMethodResponse | null>(null);
  
  const basicPlan: any = [
    "Access to all stream-related content",
    "Limited content",
    "Broadcast whenever you want!",
  ];
  const premiumPlan: any = [
    "Access to all stream-related content",
    "Ilimited content",
    "Access to the movie and anime catalogue",
    "Broadcast whenever you want!",
  ];

  const auth = useAuth()
  const user = auth.getUser()
  const token = auth.getToken()

  useEffect(() => {
    const fetchPayMethod = async () => {
      if (!user?.id) return;
  
      try {
        const res = await fetch(
          `http://localhost:3000/vortextream/paymethod/${user.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        if (!res.ok) {
          throw new Error("Paymethod not found");
        }
  
        const resToJson = (await res.json()) as PayMethodResponse;
        console.log(resToJson);
        
        setPayMethodInfo(resToJson);
      } catch (err) {
        console.error("Error fetching pay method:", err);
      }
    };

    fetchPayMethod()
  }, [user?.id, token])
  
  return (
    <div className="container-chekOut-page">
      <div className="plans-suscriptions">
        <div>
          <h1 className="title-upergrade-premium">Upgrade to premium!</h1>
        </div>
        <div className="type-plans-container">
          <PlanSubscriptionCardComponent
            price="Free"
            icono={<Frown size={"6rem"} color="#F08080" />}
            text="Basic Plan"
            title="Fan"
            benefices={basicPlan}
          />
          <PlanSubscriptionCardComponent
            price="USD 7.99/Month"
            icono={<Crown size={"6rem"} color="#F08080" />}
            text="Premium Plan"
            title="Mega Fan"
            benefices={premiumPlan}
          />
        </div>
      </div>
      <div className="container-checkoutFinally">
        <FormCheckout payMethod={payMethodInfo} />
      </div>
    </div>
  );
}
