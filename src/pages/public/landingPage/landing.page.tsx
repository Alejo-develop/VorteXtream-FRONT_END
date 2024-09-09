import HeaderComponent from "../../../common/components/header/header.component";
import { NavBarLayout } from "../../../layouts/NavBar.Layout";

export default function LandingPage(){
    return (
        <div>
            <NavBarLayout />
            <HeaderComponent />


            <div>
                Most watched in Colombia
            </div>
        </div>
    )
}