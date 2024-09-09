import LoginButtonComponent from "../loginButton/loginButton.component";
import SignUpButtonComponent from "../SignUpButton/signUpButton.component";
import Logo from "../../../assets/img/Logo.png";
import "./styles/styleHeader.css";
import ExplorerButtonComponent from "../explorerButton/explorerButton.component";

const HeaderComponent = () => {
  return (
    <header className="header">
      <div className="container-explorer">
        <img src={Logo} alt="LogoImg" className="logo" />
        <ExplorerButtonComponent /> 
      </div>

      <div className="container-search">
        <form>
          <input type="search" />
        </form>
        <SignUpButtonComponent />

        <LoginButtonComponent />

      </div>
    </header>
  );
};

export default HeaderComponent;
