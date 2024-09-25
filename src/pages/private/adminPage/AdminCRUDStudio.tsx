import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import GridCrudComponent from "./components/GridCrud.component";
import NavBarAdmin from "./components/NavbarAdmin.component";
import FormStudios from "./components/CrudStudios/Form.studios";
import ContentDeleteAndEdit from "./components/ContentDeleteAndEdit";
import useAlert from "../../private/userMenu/components/alert.component";

// API base URL for studios
const API_BASE_URL = `${import.meta.env.VITE_BACKEND_URL_JAVA}/studios`;

// Define the type for studio data
export interface StudioData {
    id: string;
    name: string;
    country: string;
    foundationYear: number;
}

export function AdminCrudStudios() {
    const [studios, setStudios] = useState<StudioData[]>([]);
    const [selectedStudio, setSelectedStudio] = useState<StudioData | null>(null);
    const { showAlert } = useAlert();

    // Fetch studios from the API
    useEffect(() => {
        const fetchStudios = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/readAll`);
                const data = await response.json();
                setStudios(data); // Assuming response is an array of studios
            } catch (error) {
                console.error("Error fetching studios:", error);
            }
        };

        fetchStudios();
    }, []);

    // Function to save or edit a studio
    const handleSaveStudio = async (studioData: Omit<StudioData, "id">) => {
        if (selectedStudio) {
            // Edit studio
            try {
                await fetch(`${API_BASE_URL}/update/${selectedStudio.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ ...studioData, id: selectedStudio.id }), // Include id
                });
                setStudios(studios.map(studio => studio.id === selectedStudio.id ? { ...selectedStudio, ...studioData } : studio));
                setSelectedStudio(null); // Clear selected studio after editing
                showAlert("success", "Studio Edited", "The studio was edited successfully.");
            } catch (error) {
                console.error("Error updating studio:", error);
            }
        } else {
            // Create new studio
            try {
                const response = await fetch(`${API_BASE_URL}/create`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(studioData), // Without id, as backend generates one
                });
                const newStudio: StudioData = await response.json(); // Assuming API returns the new studio
                setStudios([...studios, newStudio]);
                showAlert("success", "Studio Created", "The studio was created successfully.");
            } catch (error) {
                console.error("Error creating studio:", error);
            }
        }
    };

    // Function to select a studio for editing
    const handleEditStudio = (id: string) => {
        const studio = studios.find(studio => studio.id === id);
        setSelectedStudio(studio || null); // Set selected studio
    };

    // Function to delete a studio
    const handleDeleteStudio = async (id: string) => {
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
                await fetch(`${API_BASE_URL}/delete/${id}`, {
                    method: "DELETE",
                });
                setStudios(studios.filter(studio => studio.id !== id));
                showAlert("success", "Studio Deleted", "The studio was deleted successfully.");
            } catch (error) {
                console.error("Error deleting studio:", error);
            }
        }
    };

    return (
        <div className="admin-page-container">
            <div className="navbar-container">
                <NavBarAdmin />
            </div>
            <section className="container-all-crud">
                <GridCrudComponent
                    formContent={<FormStudios selectedItem={selectedStudio} onSave={handleSaveStudio} />}
                    contentDeleteAndEdit={
                        studios.map(studio => (
                            <ContentDeleteAndEdit
                                key={studio.id}
                                name={studio.name}
                                id={studio.id}
                                onClickDelete={() => handleDeleteStudio(studio.id)}
                                onClickEdit={() => handleEditStudio(studio.id)} // Call edit function
                            />
                        ))
                    }
                />
            </section>
        </div>
    );
}
