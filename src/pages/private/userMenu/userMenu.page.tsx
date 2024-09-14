import { useState } from 'react'
import './style.css'
import { useAuth } from '../../../auth/auth.provider'
import ButtonUserMenuLandingComponent from '../../../common/components/userMenuLanding/buttonUserMenuLanding.component'
import PorfileSettingsView from './components/porfileSettings.component'
import SubcriptionView from './components/suscriptionView.component'
import EmailView from './components/emailView.component'
import PasswordView from './components/passwordView.component'

export default function UserMenuPage(){
    const [activeView, setActiveView] = useState('profile');

    const auth = useAuth()
    const user = auth.getUser()

    const switchView = (component: any) => {
        setActiveView(component)
    }

    const renderComponent = () => {
        switch(activeView){
            case 'profile':
                return <PorfileSettingsView />;

            case 'subcription':
                return <SubcriptionView />

            case 'email':
                return <EmailView />

            case 'password':
                return <PasswordView />
        }
    }

    return(
        <div className="menuPage-user-container">
            <div className='body-menuUser-page'>
                <div className='container-options-menuUser'>
                    <div  className='title-section-username'>
                        <img src={user.urlprofile} alt="img-menUserPage" className='img-menuUser-page' />
                        <h2>{user.username}</h2>
                    </div>
                    
                    <div className='title-section-menuUser'>
                        <h3>General</h3>
                        <ButtonUserMenuLandingComponent onclick={() => switchView('profile')} color='4C5270' text='Profile' width='14' />
                        <ButtonUserMenuLandingComponent  onclick={() => switchView('subcription')} color='4C5270' text='Suscription' width='14' />
                    </div>

                    <div className='title-section-menuUser'>
                        <h3>Account</h3>
                        <ButtonUserMenuLandingComponent onclick={() => switchView('email')} color='4C5270' text='Email' width='14' />
                        <ButtonUserMenuLandingComponent onclick={() => switchView('password')} color='4C5270' text='Password' width='14' />
                    </div>

                </div>
                <div className='container-typeButton-menuUser'>
                    {renderComponent()}
                </div>
            </div>
        </div>
    )
}