import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import GridCrudComponent from "./components/GridCrud.component";
import NavBarAdmin from "./components/NavbarAdmin.component";
import FormCrudDirectors from "./components/CrudDirectors/FormDirectors";
import ContentDeleteAndEdit from "./components/ContentDeleteAndEdit";
import useAlert from "../../private/userMenu/components/alert.component"; // Importa el hook useAlert
import { DirectorData } from "./components/CrudDirectors/FormDirectors"; // Importa la interfaz

// Aquí puedes definir el endpoint si está disponible, si no puedes manejar datos locales
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_URL = `https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}&language=en-US&page=1`;

export function AdminCrudDirectorsPage() {
    const [directors, setDirectors] = useState<DirectorData[]>([]);
    const [selectedDirector, setSelectedDirector] = useState<DirectorData | null>(null);
    const { showAlert } = useAlert();

    // Obtener datos de directores desde TMDb (o manejar datos locales)
    useEffect(() => {
        const fetchDirectors = async () => {
            try {
                const response = await fetch(API_URL);
                const data = await response.json();
                const formattedDirectors: DirectorData[] = data.results.map((person: any) => ({
                    id: person.id.toString(),
                    name: person.name,
                    age: 0, // TMDb no proporciona la edad, puedes agregar esta información manualmente o buscar otra fuente
                    synopsis: "", // TMDb no proporciona una sinopsis para directores
                    image: null,
                }));
                setDirectors(formattedDirectors);
            } catch (error) {
                console.error("Error fetching directors from TMDb:", error);
            }
        };

        fetchDirectors();
    }, []);

    // Función para guardar o editar un director
    const handleSaveDirector = (directorData: Omit<DirectorData, "id">) => {
        if (selectedDirector) {
            // Editar director
            setDirectors(directors.map(director => director.id === selectedDirector.id ? { ...selectedDirector, ...directorData } : director));
            setSelectedDirector(null);
            showAlert("success", "Director Edited", "The director was edited successfully.");
        } else {
            // Crear nuevo director
            const newDirector: DirectorData = { id: Date.now().toString(), ...directorData };
            setDirectors([...directors, newDirector]);
            showAlert("success", "Director Created", "The director was created successfully.");
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
            setDirectors(directors.filter(director => director.id !== id));
            showAlert("success", "Director Deleted", "The director was deleted successfully.");
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
