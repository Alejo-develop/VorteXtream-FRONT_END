import { useState } from "react"
import { useAuth } from "../../../../auth/auth.provider"
import LabelComponent from "../../../public/registerPage/components/label.component"
import ButtonMenuUserComponent from "./buttonMenuUser.component"

const EmailView = () => {
    const [ newEmail, setNewEmail ] = useState(' ')

    const auth = useAuth()
    const user = auth.getUser()
    
    return (
        <div className="containerViews">
            
            <form className="container-form-changeEmail-view">
            <h1 className="title-changeEmail-view">Change your Email</h1>
                <LabelComponent disable={true} className="input-menuUser-profileView" valueDefault={user.username} type="text" value={user.username}/>
                <LabelComponent className="input-menuUser-profileView" placeholder="New Email" type="text" onChange={(e) => setNewEmail(e.target.value)} value={newEmail} />

                <ButtonMenuUserComponent size="150" height="40" fontweight="1" text="Submit" type="submit" />
            </form>
        </div>
    )
}

export default EmailView