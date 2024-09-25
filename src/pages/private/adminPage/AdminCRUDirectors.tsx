import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import GridCrudComponent from "./components/GridCrud.component";
import NavBarAdmin from "./components/NavbarAdmin.component";
import FormCrudDirectors from "./components/CrudDirectors/FormDirectors";
import ContentDeleteAndEdit from "./components/ContentDeleteAndEdit";
import useAlert from "../../private/userMenu/components/alert.component"; // Importa el hook useAlert
import { DirectorData } from "./components/CrudDirectors/FormDirectors"; // Importa la interfaz

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL_JAVA}/directors`;

export function AdminCrudDirectorsPage() {
    const [directors, setDirectors] = useState<DirectorData[]>([]);
    const [selectedDirector, setSelectedDirector] = useState<DirectorData | null>(null);
    const { showAlert } = useAlert();

    // Obtener todos los directores
    const fetchDirectors = async () => {
        try {
            const response = await fetch(`${BASE_URL}/readAll`);
            const data = await response.json();
            setDirectors(data);
        } catch (error) {
            console.error("Error fetching directors:", error);
        }
    };

    useEffect(() => {
        fetchDirectors();
    }, []);

    // Función para guardar o editar un director
    const handleSaveDirector = async (directorData: Omit<DirectorData, "id">) => {
        if (selectedDirector) {
            // Editar director
            try {
                const response = await fetch(`${BASE_URL}/update/${selectedDirector.id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(directorData),
                });

                if (response.ok) {
                    setDirectors(directors.map(director => director.id === selectedDirector.id ? { ...selectedDirector, ...directorData } : director));
                    setSelectedDirector(null);
                    showAlert("success", "Director Edited", "The director was edited successfully.");
                } else {
                    showAlert("error", "Edit Failed", "Failed to edit the director.");
                }
            } catch (error) {
                console.error("Error editing director:", error);
            }
        } else {
            // Crear nuevo director
            try {
                const response = await fetch(`${BASE_URL}/create`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(directorData),
                });

                if (response.ok) {
                    const newDirector = await response.json();
                    setDirectors([...directors, newDirector]);
                    showAlert("success", "Director Created", "The director was created successfully.");
                } else {
                    showAlert("error", "Creation Failed", "Failed to create the director.");
                }
            } catch (error) {
                console.error("Error creating director:", error);
            }
        }
    };

    // Función para eliminar un director
    const handleDeleteDirector = async (id: string) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
            try {
                const response = await fetch(`${BASE_URL}/delete/${id}`, {
                    method: "DELETE",
                });

                if (response.ok) {
                    setDirectors(directors.filter(director => director.id !== id));
                    showAlert("success", "Director Deleted", "The director was deleted successfully.");
                } else {
                    showAlert("error", "Delete Failed", "Failed to delete the director.");
                }
            } catch (error) {
                console.error("Error deleting director:", error);
            }
        }
    };

    // Función para seleccionar un director para editar
    const handleEditDirector = (id: string) => {
        const director = directors.find(director => director.id === id);
        setSelectedDirector(director || null);
    };    

    return (
        <div className="admin-page-container">
            <div className="navbar-container">
                <NavBarAdmin />
            </div>
            <section className="container-all-crud">
                <GridCrudComponent
                    formContent={<FormCrudDirectors selectedItem={selectedDirector} onSave={handleSaveDirector} />}
                    contentDeleteAndEdit={
                        directors.map(director => (
                            <ContentDeleteAndEdit
                                key={director.id}
                                name={director.name}
                                id={director.id}
                                onClickDelete={() => handleDeleteDirector(director.id)}
                                onClickEdit={() => handleEditDirector(director.id)}
                            />
                        ))
                    }
                />
            </section>
        </div>
    );
}
