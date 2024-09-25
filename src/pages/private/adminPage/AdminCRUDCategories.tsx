import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import GridCrudComponent from "./components/GridCrud.component";
import NavBarAdmin from "./components/NavbarAdmin.component";
import { FormCrudCategories } from "./components/CrudCategories/FormCategegories";
import ContentDeleteAndEdit from "./components/ContentDeleteAndEdit";
import useAlert from "../../private/userMenu/components/alert.component";

// Define the type of category data
type CategoryData = {
    id: string;
    name: string;
    description: string;
};

const API_BASE_URL = `${import.meta.env.VITE_BACKEND_URL_JAVA}/categories`;

export function AdminCrudCategoriesPage() {
    const [categories, setCategories] = useState<CategoryData[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<CategoryData | null>(null);
    const { showAlert } = useAlert();

    // Fetch categories from the API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/readAll`);
                const data = await response.json();
                setCategories(data); // Assuming the response is an array of categories
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    // Save or edit a category
    const handleSaveCategory = async (categoryData: Omit<CategoryData, "id">) => {
        if (selectedCategory) {
            // Edit category
            try {
                await fetch(`${API_BASE_URL}/update/${selectedCategory.id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ ...categoryData, id: selectedCategory.id }),
                });
                setCategories(categories.map(category => category.id === selectedCategory.id ? { ...selectedCategory, ...categoryData } : category));
                setSelectedCategory(null);
                showAlert("success", "Category Edited", "The category was edited successfully.");
            } catch (error) {
                console.error("Error updating category:", error);
            }
        } else {
            // Create new category
            try {
                const response = await fetch(`${API_BASE_URL}/create`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(categoryData),
                });
                const newCategory: CategoryData = await response.json(); // Assuming the API returns the new category
                setCategories([...categories, newCategory]);
                showAlert("success", "Category Created", "The category was created successfully.");
            } catch (error) {
                console.error("Error creating category:", error);
            }
        }
    };


    const handleEditCategory = (id: string) => {
        const category = categories.find(category => category.id === id);
        setSelectedCategory(category || null);
    };

    // Delete a category
    const handleDeleteCategory = async (id: string) => {
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
                setCategories(categories.filter(category => category.id !== id));
                showAlert("success", "Category Deleted", "The category was deleted successfully.");
            } catch (error) {
                console.error("Error deleting category:", error);
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
                    formContent={<FormCrudCategories selectedItem={selectedCategory} onSave={handleSaveCategory} />}
                    contentDeleteAndEdit={
                        categories.map(category => (
                            <ContentDeleteAndEdit
                                key={category.id}
                                name={category.name}
                                id={category.id}
                                onClickDelete={() => handleDeleteCategory(category.id)}
                                onClickEdit={() => handleEditCategory(category.id)}
                            />
                        ))
                    }
                />
            </section>
        </div>
    );
}
