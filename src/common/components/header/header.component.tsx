import LoginButtonComponent from "../loginButton/loginButton.component";
import SignUpButtonComponent from "../SignUpButton/signUpButton.component";
import Logo from "../../../assets/img/Logo.png";
import "./styles/styleHeader.css";
import ExplorerButtonComponent from "../explorerButton/explorerButton.component";
import { useAuth } from "../../../auth/auth.provider";
import NotificationConfigComponent from "../notificationButton/notificationButton.component";
import UserConfigComponent from "../userConfig/userConfig.component";

const HeaderComponent = () => {
  const auth = useAuth()

    const RenderForm1 = auth.isAuthenticated ? NotificationConfigComponent: SignUpButtonComponent
    const RenderForm2 = auth.isAuthenticated ? UserConfigComponent: LoginButtonComponent


  return (
    <header className="header">
      <div className="container-explorer">
        <div className="container-logo">
          <img src={Logo} alt="LogoImg" className="logo" />
        </div>
        <ExplorerButtonComponent />
      </div>

      <div className="container-search">
        <form>
          <input
            type="search"
            className="input-search"
            placeholder="What you want see today?"
          />
        </form>
        <RenderForm1 />

        <RenderForm2 />
      </div>
    </header>
  );
};

export default HeaderComponent;
