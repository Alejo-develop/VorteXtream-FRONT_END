import { useAuth } from "../../../auth/auth.provider"
import ButtonUserMenuLandingComponent from "./buttonUserMenuLanding.component"
import './style.css'

const UserMenuLandingComponent = () => {
    const auth = useAuth()
    const user = auth.getUser()
    
    return( 
        <div className="container-menuUser-landing">
            <div>
                <img src={user.urlprofile} alt="imgUser-menuUser-landign" className="imgUser-menuUser-landign" />
                
                <h3 className="username-menuUser-landing">{user.username}</h3>
            </div>

            <div className="options-userMenu-landing">
                <ButtonUserMenuLandingComponent width="19.8"  text="Settings profile" path="/" />
                <ButtonUserMenuLandingComponent width="19.8" text="History/Favorites" path="/" />
                <ButtonUserMenuLandingComponent width="19.8"  text="Privacy settings" path="/" />
                <ButtonUserMenuLandingComponent width="19.8" text="Log Out" path="/" />
            </div>
        </div>
    )
}

export default UserMenuLandingComponent