import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import GridCrudComponent from "./components/GridCrud.component";
import NavBarAdmin from "./components/NavbarAdmin.component";
import FormCrudDirectors from "./components/CrudDirectors/FormDirectors";
import ContentDeleteAndEdit from "./components/ContentDeleteAndEdit";
import useAlert from "../../private/userMenu/components/alert.component";
import { DirectorData } from "./components/CrudDirectors/FormDirectors"; 

// Base API URL for the directors
const BASE_URL = `${import.meta.env.VITE_BACKEND_URL_JAVA}/directors`;

export function AdminCrudDirectorsPage() {
    // State to hold the list of directors and the currently selected director for editing
    const [directors, setDirectors] = useState<DirectorData[]>([]);
    const [selectedDirector, setSelectedDirector] = useState<DirectorData | null>(null);
    const { showAlert } = useAlert();

    // Function to fetch all directors from the API
    const fetchDirectors = async () => {
        try {
            const response = await fetch(`${BASE_URL}/readAll`);
            const data = await response.json();
            setDirectors(data); // Update state with fetched directors
        } catch (error) {
            console.error("Error fetching directors:", error);
        }
    };

    // useEffect hook to fetch the directors when the component mounts
    useEffect(() => {
        fetchDirectors();
    }, []);

    // Handle saving a director (either creating a new one or updating an existing one)
    const handleSaveDirector = async (directorData: Omit<DirectorData, "id">) => {
        if (selectedDirector) {
            // If a director is selected, update the existing director
            try {
                const response = await fetch(`${BASE_URL}/update/${selectedDirector.id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(directorData),
                });

                if (response.ok) {
                    // Update the list of directors after successful edit
                    setDirectors(directors.map(director => director.id === selectedDirector.id ? { ...selectedDirector, ...directorData } : director));
                    setSelectedDirector(null); // Clear the selected director
                    showAlert("success", "Director Edited", "The director was edited successfully.");
                } else {
                    showAlert("error", "Edit Failed", "Failed to edit the director.");
                }
            } catch (error) {
                console.error("Error editing director:", error); 
            }
        } else {
            // Otherwise, create a new director
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
                    // Add the new director to the list
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

    // Handle deleting a director
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
            // If the user confirms, proceed with the deletion
            try {
                const response = await fetch(`${BASE_URL}/delete/${id}`, {
                    method: "DELETE",
                });

                if (response.ok) {
                    // Update the list of directors after successful deletion
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

    // Handle selecting a director for editing
    const handleEditDirector = (id: string) => {
        const director = directors.find(director => director.id === id);
        setSelectedDirector(director || null); // Set the selected director for editing
    };    

    return (
        <div className="admin-page-container">
            <div className="navbar-container">
                <NavBarAdmin />
            </div>
            <section className="container-all-crud">
                {/* Grid component that displays the form and the list of directors */}
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
