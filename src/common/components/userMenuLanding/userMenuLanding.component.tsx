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
            </div>
                <h3 className="username-menuUser-landing">{user.username}</h3>

            <div className="options-userMenu-landing">
                <ButtonUserMenuLandingComponent color="2F3241" width="19.8"  text="Settings profile" path="/usermenu" />
                <ButtonUserMenuLandingComponent color="2F3241" width="19.8" text="History/Favorites" path="/history&favorites" />
                <div className="logOut-buttonCointainer-userMenu">
                <ButtonUserMenuLandingComponent color="2F3241" logOut={true} width="19.8" text="Log Out" path="/login" />
                </div>
            </div>
        </div>
    )
}

export default UserMenuLandingComponent