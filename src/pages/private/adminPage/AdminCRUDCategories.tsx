import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import GridCrudComponent from "./components/GridCrud.component";
import NavBarAdmin from "./components/NavbarAdmin.component";
import { FormCrudCategories } from "./components/CrudCategories/FormCategegories";
import ContentDeleteAndEdit from "./components/ContentDeleteAndEdit";
import useAlert from "../../private/userMenu/components/alert.component";

// Definimos el tipo de los datos de categoría
type CategoryData = {
    id: string;
    name: string;
    description: string;
};

// API para obtener categorías desde TMDb
const API_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=a3c97fc58c271f7b5b5cc1c31b8ef888&language=en-US`;

export function AdminCrudCategoriesPage() {
    const [categories, setCategories] = useState<CategoryData[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<CategoryData | null>(null);
    const { showAlert } = useAlert();

    // Obtener las categorías desde TMDb
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(API_URL);
                const data = await response.json();
                const formattedCategories: CategoryData[] = data.genres.map((genre: any) => ({
                    id: genre.id.toString(),
                    name: genre.name,
                    description: "", // TMDb no proporciona una descripción
                }));
                setCategories(formattedCategories);
            } catch (error) {
                console.error("Error fetching categories from TMDb:", error);
            }
        };

        fetchCategories();
    }, []);

    // Función para guardar o editar una categoría
    const handleSaveCategory = (categoryData: Omit<CategoryData, "id">) => {
        if (selectedCategory) {
            // Editar categoría
            setCategories(categories.map(category => category.id === selectedCategory.id ? { ...selectedCategory, ...categoryData } : category));
            setSelectedCategory(null); // Limpiar la categoría seleccionada después de editar
            showAlert("success", "Category Edited", "The category was edited successfully.");
        } else {
            // Crear nueva categoría
            const newCategory: CategoryData = { id: Date.now().toString(), ...categoryData };
            setCategories([...categories, newCategory]);
            showAlert("success", "Category Created", "The category was created successfully.");
        }
    };

    // Función para seleccionar una categoría para editar
    const handleEditCategory = (id: string) => {
        const category = categories.find(category => category.id === id);
        setSelectedCategory(category || null); // Establecer la categoría seleccionada
    };

    // Función para eliminar una categoría
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
            setCategories(categories.filter(category => category.id !== id));
            showAlert("success", "Category Deleted", "The category was deleted successfully.");
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
                                onClickEdit={() => handleEditCategory(category.id)} // Llamar a la función de edición
                            />
                        ))
                    }
                />
            </section>
        </div>
    );
}
