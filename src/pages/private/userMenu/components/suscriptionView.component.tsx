import PremiumContainerComponent from "../../../../common/components/subcriptionsStatus/premiumContainer.component"
import IsNotPremiumContainer from "../../../../common/components/subcriptionsStatus/isntPremium.component"
import FormMethodPay from "../../../../common/components/formPayMethod/formMethodPay.component"
import { useAuth } from "../../../../auth/auth.provider"

const SubcriptionView = () => {
    const auth = useAuth()
    const RenderForm = auth.isPremium ? PremiumContainerComponent : IsNotPremiumContainer

    return (
        <div className="containerViews">
            <RenderForm />
        
            <FormMethodPay />
        </div>
    )
}

export default SubcriptionView