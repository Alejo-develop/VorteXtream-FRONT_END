import PremiumContainerComponent from "../../../../common/components/subcriptionsStatus/premiumContainer.component"
import IsNotPremiumContainer from "../../../../common/components/subcriptionsStatus/isntPremium.component"
import FormMethodPay from "../../../../common/components/formPayMethod/formMethodPay.component"


const SubcriptionView = () => {
    return (
        <div className="containerViews">
            {/* <IsNotPremiumContainer /> */}
            <PremiumContainerComponent />
        
            <FormMethodPay />
        </div>
    )
}

export default SubcriptionView