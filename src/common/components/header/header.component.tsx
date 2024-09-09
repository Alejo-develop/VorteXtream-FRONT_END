import LoginButtonComponent from "../loginButton/loginButton.component";
import SignUpButtonComponent from "../SignUpButton/signUpButton.component";
import Logo from "../../../assets/img/Logo.png";
import "./styles/styleHeader.css";
import ExplorerButtonComponent from "../explorerButton/explorerButton.component";

const HeaderComponent = () => {
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
        <SignUpButtonComponent />

        <LoginButtonComponent />
      </div>
    </header>
  );
};

export default HeaderComponent;
