import { useEffect, useState } from "react";
import LabelComponent from "../../../public/registerPage/components/label.component";
import { useAuth } from "../../../../auth/auth.provider";
import ButtonMenuUserComponent from "./buttonMenuUser.component";
import { UserResponse } from "../../../../common/interfaces/user.interface";
import useAlert from "./alert.component";
import { Country } from "../../../public/registerPage/registerForm.component";

const ProfileSettingsView = () => {
  const auth = useAuth();
  const user = auth.getUser();
  const token = auth.getToken();

  const [userInfo, setUserInfo] = useState<UserResponse>({
    bornDate: null,
    country: null,
    prefixCountry: null,
    email: null,
    id: null,
    lastName: null,
    name: null,
    phoneNumber: null,
    secondName: null,
    urlprofile: null,
    username: null,
  });

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bornDate, setBornDate] = useState("");
  const [country, setCountry] = useState<Country | null>(null);
  const [countries, setCountries] = useState<Country[]>([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profileImage, setProfileImage] = useState(user.urlprofile || "");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const { showAlert } = useAlert();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedImage(null);
    }
  };

  const fetchInfoUser = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/auth/findoneuser/${user.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const resToJson = (await res.json()) as UserResponse;
      setUserInfo(resToJson);
      return resToJson; // Retorna la información del usuario
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedImage && !user.urlprofile) {
      showAlert("error", "No image uploaded", "Please upload an image or provide a URL.");
      return;
    }

    const formData = new FormData();

    if (selectedImage) {
      formData.append("profileimage", selectedImage);
    }

    formData.append("username", username || user.username || '');
    formData.append("name", name || userInfo.name || '');
    formData.append("secondName", secondName || userInfo.secondName || '');
    formData.append("lastName", lastName || userInfo.lastName || '');
    formData.append("bornDate", bornDate || userInfo.bornDate || '');
    formData.append("country", country ? country.name : user.country || '');
    formData.append("prefixCountry", country ? country.code : userInfo.prefixCountry || '');
    formData.append("phoneNumber", phoneNumber || userInfo.phoneNumber || '');

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/auth/changeuserinfo/${user.id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!res.ok) {
        const errorToJson = await res.json();
        setErrorMessage(errorToJson)
        showAlert("error", "Error updating", errorToJson.message || "Error updating");
        throw new Error(errorMessage);
      }
      showAlert("success", "Updated successfully", "Updated your info!");
    } catch (err) {
      console.error("Error:", err);
      showAlert("error", "Unexpected error", "An unexpected error occurred.");
    }
  };

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

  useEffect(() => {
    fetchInfoUser();
  }, []);

  useEffect(() => {
    if (user.urlprofile) {
      setProfileImage(user.urlprofile);
    }
  }, [user.urlprofile]);

  return (
    <div className="containerViews">
      <form
        onSubmit={handleSubmit}
        className="container-form-settingsProfileView"
      >
        <div className="image-upload-container">
          <img
            id="preview"
            src={profileImage}
            alt="Profile"
            className="img-upload"
          />
          <div className="file-upload-wrapper">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="input-file-userSettings"
            />
            <span className="file-upload-text">Select an image</span>
          </div>
        </div>
        <LabelComponent
          className="input-menuUser-profileView"
          type="text"
          value={username}
          placeholder={user.username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <LabelComponent
          className="input-menuUser-profileView"
          type="text"
          placeholder={userInfo.name || "First Name"}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <LabelComponent
          className="input-menuUser-profileView"
          type="text"
          placeholder={userInfo.secondName || "Second Name"}
          value={secondName}
          onChange={(e) => setSecondName(e.target.value)}
        />
        <LabelComponent
          className="input-menuUser-profileView"
          type="text"
          placeholder={userInfo.lastName || "Last Name"}
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <LabelComponent
          className="input-menuUser-profileView"
          type="date"
          placeholder={"Birth Date"}
          value={bornDate}
          onChange={(e) => setBornDate(e.target.value)}
        />
        <div className="country-select">
          <select
            className="input-menuUser-profileView-country"
            value={country ? country.code : ""}
            onChange={(e) => {
              const selectedCountry = countries.find(
                (c) => c.code === e.target.value
              );
              setCountry(selectedCountry || null);
            }}
          >
            <option value="" disabled>
              {userInfo.country || 'Select your Country'}
            </option>
            {countries.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <LabelComponent
          className="input-menuUser-profileView"
          type="text"
          placeholder={userInfo.phoneNumber || "Phone Number"}
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />

        <ButtonMenuUserComponent
          size="150"
          height="40"
          fontweight="1"
          text="Submit"
          type="submit"
        />
      </form>
    </div>
  );
};

export default ProfileSettingsView;
