import LoginButtonComponent from "../loginButton/loginButton.component";
import SignUpButtonComponent from "../SignUpButton/signUpButton.component";
import Logo from "../../../assets/img/Logo.png";
import "./styles/styleHeader.css";

const HeaderComponent = () => {
  return (
    <header className="header">
      <div>
        <img src={Logo} alt="Logoimg" className="logo" />
      </div>

      <div>
        <form>
          <input type="search" />
        </form>

        <LoginButtonComponent />

        <SignUpButtonComponent />
      </div>
    </header>
  );
};

export default HeaderComponent;
