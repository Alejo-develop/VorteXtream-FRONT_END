import LabelComponent from "./components/label.component";
import "./stylesRegister/style.register.css";
import { User, Lock, Mail } from "lucide-react";

const RegisterComponent = () => {
  return (
    <div className="register">
      <h1>Create account</h1>

      <div className="container-form">
        <form className="register-form">
          <LabelComponent icon={<User style={{ position: 'relative', left: '35px', top: '7px'}} />} placeholder="Username" />
          <LabelComponent icon={<Mail style={{ position: 'relative', left: '35px', top: '7px'}} />}  placeholder="Email"/>
          <LabelComponent icon={<Lock style={{ position: 'relative', left: '35px', top: '7px'}} />} placeholder="Password"/>
          <LabelComponent icon={<Lock style={{ position: 'relative', left: '35px', top: '7px'}} />} placeholder="Confirm password"/>

          <button>
            Submit
          </button>
        </form>

        <h3>OR</h3>

        <div className="google-container">
          <h5>Certificacion con google</h5>
        </div>
      </div>
    </div>
  );
};

export default RegisterComponent;
