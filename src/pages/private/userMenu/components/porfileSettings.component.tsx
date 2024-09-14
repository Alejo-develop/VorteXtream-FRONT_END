import { useEffect, useState } from "react";
import LabelComponent from "../../../public/registerPage/components/label.component";
import { useAuth } from "../../../../auth/auth.provider";

const PorfileSettingsView = () => {
  const auth = useAuth();
  const user = auth.getUser();

  const [name, setName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bornDate, setBornDate] = useState("");
  const [country, setCountry] = useState(user.country);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profileImage, setProfileImage] = useState(user.urlprofile);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (user.urlprofile) {
      setProfileImage(user.urlprofile);
    }
  }, [user.urlprofile]);

  return (
    <div className="containerViews">
      <form className="container-form-settingsProfileView">
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
            <span className="file-upload-text">Selecciona una imagen</span>
          </div>
        </div>

        <LabelComponent
          className="input-menuUser-profileView"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <LabelComponent
          className="input-menuUser-profileView"
          type="text"
          placeholder="Second Name"
          value={secondName}
          onChange={(e) => setSecondName(e.target.value)}
        />
        <LabelComponent
          className="input-menuUser-profileView"
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <LabelComponent
          className="input-menuUser-profileView"
          type="date"
          placeholder="bornDate"
          value={bornDate}
          onChange={(e) => setBornDate(e.target.value)}
        />
        <LabelComponent
          className="input-menuUser-profileView"
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          valueDefault={user.country}
        />
        <LabelComponent
          className="input-menuUser-profileView"
          type="text"
          placeholder="Phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </form>
    </div>
  );
};

export default PorfileSettingsView;
