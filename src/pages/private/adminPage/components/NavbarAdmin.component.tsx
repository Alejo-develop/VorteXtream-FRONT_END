import { House, Clapperboard, Projector, UserPen, Layers2, Layers3, LogOut } from "lucide-react";
import ButtonAdmin from "./ButtonAdmin";
import '../styles/navbarAdmin.css';

const NavBarAdmin = () => {
    return (
        <div className="container-nav-admin">
        
            <nav className="sidebar-admin">
                <ButtonAdmin
                    path="/adminpage"
                    icono={<House size={28} />}
                    text="Home" // Agrega el texto que quieres mostrar
                    className="icon-link-admin"
                />
                <ButtonAdmin
                    path="/crudmovie"
                    icono={<Clapperboard size={28} />}
                    text="Movies" // Agrega el texto que quieres mostrar
                    className="icon-link-admin"
                />
                <ButtonAdmin
                    path="/crudirectors"
                    icono={<Projector size={28} />}
                    text="Directors" // Agrega el texto que quieres mostrar
                    className="icon-link-admin"
                />
                <ButtonAdmin
                    path="/crudcast"
                    icono={<UserPen size={28} />}
                    text="Cast" // Agrega el texto que quieres mostrar
                    className="icon-link-admin"
                />
                <ButtonAdmin
                    path="/crudcategories"
                    icono={<Layers3 size={28} />}
                    text="Category" // Agrega el texto que quieres mostrar
                    className="icon-link-admin"
                />
                <ButtonAdmin
                    path="/crudsubcategories"
                    icono={<Layers2 size={28} />}
                    text="Sub category" // Agrega el texto que quieres mostrar
                    className="icon-link-admin"
                />
                <ButtonAdmin
                    path="/logout"
                    icono={<LogOut  size={28} />}
                    text="Log out" // Agrega el texto que quieres mostrar
                    className="icon-link-admin log-out-admin"
                />
            </nav>
        </div>
    );
};

export default NavBarAdmin;
