import {
  Facebook,
  InstagramIcon,
  Linkedin,
  Twitter,
  Settings,
  Lock,
  Book,
  Languages 
} from "lucide-react";
import Logo from "../../../assets/img/Logo.png";
import "./style.css";
import ButttonFooterComponent from "../socialMediaButton/socialMediaButton.component";

const FooterComponent = () => {
  return (
    <footer className="footer">
      <section className="container-section-footer">
        <article className="section-footer">
          <ButttonFooterComponent
            name="@VortexTream"
            className="social-media"
            icon={
              <InstagramIcon size={"2.6rem"} className="icon-social-media" />
            }
          />
          <ButttonFooterComponent
            name="@VortexTream"
            className="social-media"
            icon={<Twitter size={"2.6rem"} className="icon-social-media" />}
          />
          <ButttonFooterComponent
            name="@VortexTream"
            className="social-media"
            icon={<Facebook size={"2.6rem"} className="icon-social-media" />}
          />
          <ButttonFooterComponent
            name="@VortexTream"
            className="social-media"
            icon={<Linkedin size={"2.6rem"} className="icon-social-media" />}
          />
        </article>
      </section>

      <div className="copyright-container">
        <img src={Logo} alt="" className="img-footer" />

        <p className="copyright">
          &copy; 2024 VorteXtream. All rights reserved.
        </p>
      </div>

      <section className="container-section-footer">
        <article className="section-footer">
          <ButttonFooterComponent
            name="Account settings"
            className="social-media"
            icon={<Settings size={"2.5rem"} className="icon-social-media" />}
          />
          <ButttonFooterComponent
            name="Privacy settings"
            className="social-media"
            icon={<Lock size={"2.5rem"} className="icon-social-media" />}
          />
          <ButttonFooterComponent
            name="Politics and privacy"
            className="social-media"
            icon={<Book size={"2.5rem"} className="icon-social-media" />}
          />
          <form className="social-media">
            <Languages size={"2.5rem"} />
            <select className="select-lenguaje">
              <option value="Engish">Engish</option>
              <option value="Spanish">Spanish</option>
            </select>
          </form>
        </article>
      </section>
    </footer>
  );
};

export default FooterComponent;
