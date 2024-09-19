import GridCrudComponent from "./components/GridCrud.component";
import NavBarAdmin from "./components/NavbarAdmin.component";
import './styles/crudmovies.css';
import FormCrudMovies from "./components/CrudMovies/Form.Movies";

export function AdminCrudMovie() {
    return (
        <div className="admin-page-container">
            <div className="navbar-container">
                <NavBarAdmin />
            </div>
            <section className="container-all-crud">
                {/* Se debe pasar el componente como JSX y no dentro de un array */}
                <GridCrudComponent formContent={<FormCrudMovies />} />
            </section>
        </div>
    );
}
