import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import GridCrudComponent from "./components/GridCrud.component";
import NavBarAdmin from "./components/NavbarAdmin.component";
import FormSubCategories from "./components/CrudSubcategories/Form.Subcategories";
import ContentDeleteAndEdit from "./components/ContentDeleteAndEdit";
import useAlert from "../../private/userMenu/components/alert.component";

// API base URL for subcategories
const API_BASE_URL = `${import.meta.env.VITE_BACKEND_URL_JAVA}/subCategories`;

// Define the type for subcategory data
export interface SubcategoriesData {
    id: string;
    name: string;
    description: string;
}

export function AdminCrudSubCategories() {
    const [subcategories, setSubcategories] = useState<SubcategoriesData[]>([]);
    const [selectedSubcategory, setSelectedSubcategory] = useState<SubcategoriesData | null>(null);
    const { showAlert } = useAlert();

    // Fetch subcategories from the API
    useEffect(() => {
        const fetchSubcategories = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/readAll`);
                const data = await response.json();
                setSubcategories(data); // Assuming response is an array of subcategories
            } catch (error) {
                console.error("Error fetching subcategories:", error);
            }
        };

        fetchSubcategories();
    }, []);

    // Function to save or edit a subcategory
    const handleSaveSubcategory = async (subcategoryData: Omit<SubcategoriesData, "id">) => {
        if (selectedSubcategory) {
            // Edit subcategory
            try {
                await fetch(`${API_BASE_URL}/update/${selectedSubcategory.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ ...subcategoryData, id: selectedSubcategory.id }), // Include id
                });
                setSubcategories(subcategories.map(subcategory => subcategory.id === selectedSubcategory.id ? { ...selectedSubcategory, ...subcategoryData } : subcategory));
                setSelectedSubcategory(null); // Clear selected subcategory after editing
                showAlert("success", "Subcategory Edited", "The subcategory was edited successfully.");
            } catch (error) {
                console.error("Error updating subcategory:", error);
            }
        } else {
            // Create new subcategory
            try {
                const response = await fetch(`${API_BASE_URL}/create`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(subcategoryData), // Without id, as backend generates one
                });
                const newSubcategory: SubcategoriesData = await response.json(); // Assuming API returns the new subcategory
                setSubcategories([...subcategories, newSubcategory]);
                showAlert("success", "Subcategory Created", "The subcategory was created successfully.");
            } catch (error) {
                console.error("Error creating subcategory:", error);
            }
        }
    };

    // Function to select a subcategory for editing
    const handleEditSubcategory = (id: string) => {
        const subcategory = subcategories.find(subcategory => subcategory.id === id);
        setSelectedSubcategory(subcategory || null); // Set selected subcategory
    };

    // Function to delete a subcategory
    const handleDeleteSubcategory = async (id: string) => {
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
                await fetch(`${API_BASE_URL}/deleteById/${id}`, {
                    method: "DELETE",
                });
                setSubcategories(subcategories.filter(subcategory => subcategory.id !== id));
                showAlert("success", "Subcategory Deleted", "The subcategory was deleted successfully.");
            } catch (error) {
                console.error("Error deleting subcategory:", error);
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
                    formContent={<FormSubCategories selectedItem={selectedSubcategory} onSave={handleSaveSubcategory} />}
                    contentDeleteAndEdit={
                        subcategories.map(subcategory => (
                            <ContentDeleteAndEdit
                                key={subcategory.id}
                                name={subcategory.name}
                                id={subcategory.id}
                                onClickDelete={() => handleDeleteSubcategory(subcategory.id)}
                                onClickEdit={() => handleEditSubcategory(subcategory.id)} // Call edit function
                            />
                        ))
                    }
                />
            </section>
        </div>
    );
}
