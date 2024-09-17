import GridComponent from "./components/Grid.component";
import NavBarAdmin from "./components/NavbarAdmin.component";
import './styles/pageAdmin.css'; // Asegúrate de importar el archivo CSS

export function AdminPage() {
    return (
        <div className="admin-page-container">
            <div className="navbar-container">
                <NavBarAdmin />
            </div>
            <div className="grid-container-wrapper">
                <GridComponent />
            </div>
        </div>
    );
}
