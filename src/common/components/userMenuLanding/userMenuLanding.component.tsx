import { useAuth } from "../../../auth/auth.provider"
import ButtonUserMenuLandingComponent from "./buttonUserMenuLanding.component"
import './style.css'

interface UserMenuLandingProps{
    className: string;
}

const UserMenuLandingComponent = ({ className }: UserMenuLandingProps) => {
    const auth = useAuth()
    const user = auth.getUser()
    
    return( 
        <div className={className}>
            <div>
                <img src={user.urlprofile} alt="imgUser-menuUser-landign" className="imgUser-menuUser-landign" />
                
                <h3 className="username-menuUser-landing">{user.username}</h3>
            </div>

            <div className="options-userMenu-landing">
                <ButtonUserMenuLandingComponent width="19.8"  text="Settings profile" path="/usermenu" />
                <ButtonUserMenuLandingComponent width="19.8" text="History/Favorites" path="/history&favorites" />
                <div className="logOut-buttonCointainer-userMenu">
                <ButtonUserMenuLandingComponent logOut={true} width="19.8" text="Log Out" path="/login" />
                </div>
            </div>
        </div>
    )
}

export default UserMenuLandingComponent