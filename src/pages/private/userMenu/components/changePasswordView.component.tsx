import { useState } from "react";
import LabelComponent from "../../../public/registerPage/components/label.component";
import ButtonMenuUserComponent from "./buttonMenuUser.component";
import { useAuth } from "../../../../auth/auth.provider";

const PasswordView = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newConfirmPassword, setNewConfirmPassword] = useState("");

  const auth = useAuth();
  const user = auth.getUser();
  const token = auth.getToken();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!currentPassword && !newPassword && !newConfirmPassword) {
      alert("All inputs is requerid");

      return;
    }

    if(newPassword !== newConfirmPassword){
        alert('New password and confirm password must be the same')

        return
    }

    try {
      const res = await fetch(
        `http://localhost:3000/vortextream/auth/changepassword/${user.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            password: newPassword,
          }),
        }
      );

      const resToJson = await res.json();

      if (!res.ok) {
        alert(JSON.stringify(resToJson))
        throw new Error("Cannot posible changed password")
      }

      alert("Password changed successfully");
      setCurrentPassword(' ')
      setNewConfirmPassword(' ')
      setNewPassword(' ')
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="containerViews">
      <form className="container-form-changeEmail-view" onSubmit={handleSubmit}>
        <h1 className="title-changeEmail-view">Change your Password</h1>
        <LabelComponent
          className="input-menuUser-profileView"
          type="password"
          placeholder="Current Password"
          onChange={(e) => setCurrentPassword(e.target.value)}
          value={currentPassword}
        />
        <LabelComponent
          className="input-menuUser-profileView"
          placeholder="New Password"
          type="password"
          onChange={(e) => setNewPassword(e.target.value)}
          value={newPassword}
        />
        <LabelComponent
          className="input-menuUser-profileView"
          placeholder="Confirm New Password"
          type="password"
          onChange={(e) => setNewConfirmPassword(e.target.value)}
          value={newConfirmPassword}
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

export default PasswordView;
