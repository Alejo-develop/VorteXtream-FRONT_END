
import Logo from "../../../assets/img/Logo.png";
import "./style.css";
import SubscribeComponent from "./Suscribe.component";
import { Phone, Mail } from "lucide-react";
import SocialNetworkComponent from "../socialMediaButton/socialMediaButton.component";
import OurServicesComponent from "./OurServices";

const FooterComponent = () => {
  return (
    <footer className="footer">
      <section className="container-image-sub">
        <img src={Logo} alt="VorteXtream logo" className="image-footer" />
        <SubscribeComponent />
      </section>
      <section className="services-footer">
        <div className="sevices-select">

          <OurServicesComponent />
        </div>
        
        <p className="copy-right">&copy; <span id="year"></span> Vortex. All rights reserved.</p> 
      </section>
      <section className="social-networks">
        <h2 className="contact-title">Contact with Us</h2>
        <div className="phone">
          <Phone />
          <p>+1 123 456 7890</p>
        </div>
        <div className="email">
          <Mail />
          <p>info@vortextream.com</p>
        </div>
        <SocialNetworkComponent />
      </section>
    </footer>
  );
};

export default FooterComponent;
