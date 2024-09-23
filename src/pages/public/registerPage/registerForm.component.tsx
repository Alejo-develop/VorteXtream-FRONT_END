import { SetStateAction, useState, useEffect } from "react";
import LabelComponent from "./components/label.component";
import "./styles/style.register.css";
import { User, Lock, Mail, Earth } from "lucide-react";
import { AuthResponseError } from "../../../common/interfaces/authResponse.interface";
import useAlert from "../../private/userMenu/components/alert.component";

interface registerProps {
  onChange: React.Dispatch<SetStateAction<boolean>>;
}

interface Country {
  name: string;
  code: string;
}

const RegisterComponent = (props: registerProps) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [country, setCountry] = useState<Country | null>({
    name: "United States",
    code: "US",
  });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [countries, setCountries] = useState<Country[]>([]);
  const { showAlert } = useAlert();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");

        if (response.ok) {
          const data = await response.json();
          const countryList = data
            .map((country: any) => ({
              name: country.name.common,
              code: country.cca2,
            }))
            .sort((a: Country, b: Country) => a.name.localeCompare(b.name));
          setCountries(countryList);
        } else {
          setErrorMessage("Cannot get countries.");
        }
      } catch (error) {
        setErrorMessage("Cannot get countries.");
      }
    };

    fetchCountries();
  }, []);

  const createUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("The password must be the same.");
      return;
    }

    if (!country) {
      setErrorMessage("You must select your country.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3000/vortextream/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            email,
            password,
            country: country.name,
            prefixCountry: country.code
          }),
        }
      );

      if (!response.ok) {
        const errorToJson = (await response.json()) as AuthResponseError;

        setErrorMessage(
          errorToJson ? errorToJson.message : "Unknow error"
        );
        throw new Error(errorMessage);
      }
      showAlert("success", "Success register", "Has registration successfully");

      props.onChange(true);
    } catch (err) {
      console.error(errorMessage);
    }
  };

  return (
    <div className="register">
      <h1>Sign Up</h1>

      {!!errorMessage && <p className="error-message">{errorMessage}</p>}

      <div className="container-form">
        <form className="register-form" onSubmit={createUser}>
          <LabelComponent
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            type="text"
            icon={
              <User
                style={{ position: "relative", left: "35px", top: "7px" }}
              />
            }
            placeholder="Username"
          />
          <LabelComponent
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            icon={
              <Mail
                style={{ position: "relative", left: "35px", top: "7px" }}
              />
            }
            placeholder="Email"
          />
          <LabelComponent
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            icon={
              <Lock
                style={{ position: "relative", left: "35px", top: "7px" }}
              />
            }
            placeholder="Password"
          />
          <LabelComponent
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            type="password"
            icon={
              <Lock
                style={{ position: "relative", left: "35px", top: "7px" }}
              />
            }
            placeholder="confirm Password"
          />

          <div className="country-select">
            <Earth style={{ position: "relative", left: "35px", top: "7px" }} />
            <select
              value={country ? country.code : ""}
              onChange={(e) => {
                const selectedCountry = countries.find((c) => c.code === e.target.value);
                setCountry(selectedCountry || null);
              }}
            >
              <option value="" disabled>
                Select your country
              </option>
              {countries.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterComponent;
