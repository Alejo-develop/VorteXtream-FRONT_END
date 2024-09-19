import FormCrudDirecetors from "./components/CrudDirectors/FormCast";
import GridCrudComponent from "./components/GridCrud.component";
import NavBarAdmin from "./components/NavbarAdmin.component";

export function AdminCrudDirectorsPage() {
    return (
        <div className="admin-page-container">
            <div className="navbar-container">
                <NavBarAdmin />
            </div>
            <section className="container-all-crud">
                <GridCrudComponent formContent={<FormCrudDirecetors />}  />
            </section>
        </div>
    )
}