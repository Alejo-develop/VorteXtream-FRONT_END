import { House, Clapperboard, Projector, UserPen, Layers2, Layers3, LogOut } from "lucide-react";
import ButtonAdmin from "./ButtonAdmin";
import '../styles/navbarAdmin.css';
import { useAuth } from '../../../../auth/auth.provider'; 
import { useNavigate } from 'react-router-dom'; 

const NavBarAdmin = () => {
    const auth = useAuth(); 
    const navigate = useNavigate(); 

    const handleLogout = () => {
        auth.signOut(); 
        navigate('/'); 
    };

    return (
        <div className="container-nav-admin">
            <nav className="sidebar-admin">
                <ButtonAdmin
                    path="/adminpage"
                    icono={<House size={28} />}
                    text="Home" 
                    className="icon-link-admin"
                />
                <ButtonAdmin
                    path="/adminpage/crudmovie"
                    icono={<Clapperboard size={28} />}
                    text="Movies" 
                    className="icon-link-admin"
                />
                <ButtonAdmin
                    path="/adminpage/crudirectors"
                    icono={<Projector size={28} />}
                    text="Directors" 
                    className="icon-link-admin"
                />
                <ButtonAdmin
                    path="/adminpage/crudcast"
                    icono={<UserPen size={28} />}
                    text="Cast" 
                    className="icon-link-admin"
                />
                <ButtonAdmin
                    path="/adminpage/crudcategories"
                    icono={<Layers3 size={28} />}
                    text="Category" 
                    className="icon-link-admin"
                />
                <ButtonAdmin
                    path="/crudsubcategories"
                    icono={<Layers2 size={28} />}
                    text="Sub category" 
                    className="icon-link-admin"
                />

                <ButtonAdmin
                    path="#"
                    icono={<LogOut size={28} />}
                    text="Log out"
                    className="icon-link-admin log-out-admin"
                    onClick={handleLogout} 
                />
            </nav>
        </div>
    );
};

export default NavBarAdmin;
