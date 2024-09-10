// Import the LabelComponent
import { SetStateAction, useState } from "react";
import LabelComponent from "./components/label.component";
import "./styles/style.register.css"; // Import the CSS styles for the registration component.
import { User, Lock, Mail, Earth } from "lucide-react"; // Import icons from the lucide-react 
import { AuthResponseError } from "../../../common/interfaces/authResponse.interface";

interface registerProps{
  onChange: React.Dispatch<SetStateAction<boolean>>
}

// Define the RegisterComponent functional component.
const RegisterComponent = (props: registerProps) => {
  const [ username, setUsername ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState<string>('');
  const [ confirmPassword, setConfirmPassword ] = useState<string>('');
  const [ country, setCountry ] = useState<string>('');
  const [ errorMessage, setErrorMessage ] = useState<string>(' ')

  const createUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    try {
      if(password !== confirmPassword){
        setErrorMessage('The passwords must be same')
        throw new Error('The passwords must be same')
      }

      const response = await fetch('http://localhost:3000/vortextream/auth/register', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          email,
          password,
          country
        })
      })

      if(!response.ok){
        const errorToJson = await response.json() as AuthResponseError
        setErrorMessage(errorToJson ? errorToJson.body.error : 'nada pa')
        throw new Error('Something went wrong with the server')
      }

      props.onChange(true)
    } catch (err){
      console.log(err);
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('An unexpected error occurred');
      }
    }
  }

  return (
    <div className="register">
      <h1>Create account</h1>

      {!!errorMessage && <div className="error-message">{errorMessage}</div>}

      <div className="container-form">
        {/* Form element for user registration */}
        <form className="register-form" onSubmit={createUser}>
          {/* Label component for inputs */}
          <LabelComponent onChange={(e) => setUsername(e.target.value)} value={username} type="text"
            icon={
              <User
                style={{ position: "relative", left: "35px", top: "7px" }}
              />
            }
            placeholder="Username"
          />
          <LabelComponent onChange={(e) => setEmail(e.target.value)} value={email} type="email"
            icon={
              <Mail
                style={{ position: "relative", left: "35px", top: "7px" }}
              />
            }
            placeholder="Email"
          />
          <LabelComponent onChange={(e) => setPassword(e.target.value)} value={password} type="password"
            icon={
              <Lock
                style={{ position: "relative", left: "35px", top: "7px" }}
              />
            }
            placeholder="Password"
          
          />
          <LabelComponent onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} type="password"
            icon={
              <Lock
                style={{ position: "relative", left: "35px", top: "7px" }}
              />
            }
            placeholder="Confirm password"
          />
          <LabelComponent onChange={(e) => setCountry(e.target.value)} value={country} type="text"
            icon={
              <Earth 
                style={{ position: "relative", left: "35px", top: "7px" }}
              />
            }
            placeholder="You'r country "
          />

          <button type="submit">Submit</button>
        </form>
        <h3>OR</h3>  {/* Section for alternative login method */}
        <div className="google-container">
          
          <h5>Certificacion con google</h5> {/* Header for Google certification option */}
        </div>
      </div>
    </div>
  );
};

// Export the RegisterComponent to be used in other parts of the application.
export default RegisterComponent;
