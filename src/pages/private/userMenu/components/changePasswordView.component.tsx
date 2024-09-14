import { useState } from "react"
import LabelComponent from "../../../public/registerPage/components/label.component"
import ButtonMenuUserComponent from "./buttonMenuUser.component"


const PasswordView = () => {
    const [ currentPassword, setCurrentPassword ] = useState('')
    const [ newPassword, setNewPassword ] = useState('')
    const [ newConfirmPassword, setNewConfirmPassword ] = useState('')


    return (
        <div className="containerViews">
            
        <form className="container-form-changeEmail-view">
        <h1 className="title-changeEmail-view">Change your Password</h1>
            <LabelComponent className="input-menuUser-profileView" type="password" placeholder="Current Password" onChange={(e) => setCurrentPassword(e.target.value)} value={currentPassword}/>
            <LabelComponent className="input-menuUser-profileView" placeholder="New Password" type="text" onChange={(e) => setNewPassword(e.target.value)} value={newPassword} />
            <LabelComponent className="input-menuUser-profileView" placeholder="Confirm New Password" type="text" onChange={(e) => setNewConfirmPassword(e.target.value)} value={newConfirmPassword} />

            <ButtonMenuUserComponent size="150" height="40" fontweight="1" text="Submit" type="submit" />
        </form>
    </div>
    )
}

export default PasswordView