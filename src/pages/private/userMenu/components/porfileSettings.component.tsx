import { useEffect, useState } from "react";
import LabelComponent from "../../../public/registerPage/components/label.component";
import { useAuth } from "../../../../auth/auth.provider";
import ButtonMenuUserComponent from "./buttonMenuUser.component";
import { UserResponse } from "../../../../common/interfaces/user.interface";

const PorfileSettingsView = () => {
  const auth = useAuth();
  const user = auth.getUser();
  const token = auth.getToken()

  const [ userInfo, setUserInfo ] = useState<UserResponse>({
    bornDate: null,
    country: null,
    email:null,
    id: null,
    lastName: null,
    name: null,
    phoneNumber: null,
    role: null,
    secondName: null,
    urlProfile:null,
    username: null
  })

  const[ username, setUsername ] = useState('')
  const [name, setName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bornDate, setBornDate] = useState("");
  const [country, setCountry] = useState('');
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

  const fetchInfoUser = async () => {
    try {
      const res = await fetch(`http://localhost:3000/vortextream/auth/findoneuser/${user.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })

      const resToJson = await res.json() as UserResponse
      console.log(resToJson);

      setUserInfo(resToJson)
      
    } catch (err) {
      console.error(err)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if(!name && !username && !bornDate && !lastName  && !secondName && !country && !phoneNumber){
      alert('not changes detected')

      return
    }

    try {
      const res = await fetch(`http://localhost:3000/vortextream/auth/${user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          username: username ? username : user.username,
          name: name ? name : userInfo.name,
          secondName: secondName ? secondName : userInfo.secondName,
          lastName: lastName ? lastName : userInfo.lastName,
          bornDate: bornDate ? bornDate : userInfo.bornDate,
          country: country ? country : user.country,
          phoneNumber: phoneNumber ? phoneNumber : userInfo.phoneNumber
        })
      })
      
      const resToJson = await res.json()
      console.log(resToJson);
      if(!res.ok){
        throw new Error('Cannot posible updated user')
      }

      alert('Usuario actualizado con exito')
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchInfoUser()
  }, [])

  useEffect(() => {
    if (user.urlprofile) {
      setProfileImage(user.urlprofile);
    }
  }, [user.urlprofile]);

  return (
    <div className="containerViews">
      <form onSubmit={handleSubmit} className="container-form-settingsProfileView">
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
          value={username}
          placeholder={user.username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <LabelComponent
          className="input-menuUser-profileView"
          type="text"
          placeholder={userInfo.name || 'Username'}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <LabelComponent
          className="input-menuUser-profileView"
          type="text"
          placeholder={userInfo.secondName || 'Second Name'}
          value={secondName}
          onChange={(e) => setSecondName(e.target.value)}
        />
        <LabelComponent
          className="input-menuUser-profileView"
          type="text"
          placeholder={userInfo.lastName || 'Last Name'}
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <LabelComponent
          className="input-menuUser-profileView"
          type="date"
          placeholder={'Birth Date'}
          value={bornDate}
          onChange={(e) => setBornDate(e.target.value)}
        />
        <LabelComponent
          className="input-menuUser-profileView"
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder={user.country || 'Country'}
        />
        <LabelComponent
          className="input-menuUser-profileView"
          type="text"
          placeholder={userInfo.phoneNumber || 'Phone Number'}
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />

        <ButtonMenuUserComponent size="150" height="40" fontweight="1" text="Submit" type="submit" />
      </form>
    </div>
  );
};

export default PorfileSettingsView;
