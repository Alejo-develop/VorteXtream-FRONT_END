import React, { useEffect, useState } from "react";
import ContentDeleteAndEdit from "./components/ContentDeleteAndEdit";
import FormCrudCastComponent from "./components/CrudCast/Form.cast";
import GridCrudComponent from "./components/GridCrud.component";
import NavBarAdmin from "./components/NavbarAdmin.component";
import useAlert from "../../private/userMenu/components/alert.component"; // Importar useAlert

// Definir la interfaz para los ítems
interface Item {
  id: string;
  name: string;
}

export function AdminCrudCastPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  // Usar el hook para mostrar alertas
  const { showAlert } = useAlert();

  // Realizar el fetch de los datos de la API
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await response.json();
        const formattedItems = data.map((user: any) => ({
          id: user.id.toString(),
          name: user.name,
        }));
        setItems(formattedItems);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchItems();
  }, []);

  // Función para manejar la eliminación de un ítem
  const handleDelete = (id: string) => {
    const filteredItems = items.filter((item) => item.id !== id);
    setItems(filteredItems);
    showAlert("success", "Deleted", "Item deleted successfully.");
  };

  // Función para manejar la edición de un ítem
  const handleEdit = (id: string) => {
    const itemToEdit = items.find((item) => item.id === id);
    setSelectedItem(itemToEdit || null);
  };

  // Función para manejar el guardado de un ítem
  const handleSave = (name: string, image: File | null) => {
    if (selectedItem) {
      // Editar ítem existente
      const updatedItems = items.map((item) =>
        item.id === selectedItem.id ? { ...item, name } : item
      );
      setItems(updatedItems);
      showAlert("success", "Updated", "Item updated successfully.");
    } else {
      // Crear nuevo ítem
      const newItem: Item = { id: (items.length + 1).toString(), name };
      setItems([...items, newItem]);
      showAlert("success", "Created", "Item created successfully.");
    }
    setSelectedItem(null);
  };

  return (
    <div className="admin-page-container">
      <div className="navbar-container">
        <NavBarAdmin />
      </div>
      <section className="container-all-crud">
        <GridCrudComponent
          formContent={<FormCrudCastComponent selectedItem={selectedItem} onSave={handleSave} />}
          contentDeleteAndEdit={items.map((item) => (
            <ContentDeleteAndEdit
              key={item.id}
              name={item.name}
              id={item.id}
              onClickDelete={() => handleDelete(item.id)}
              onClickEdit={() => handleEdit(item.id)}
            />
          ))}
        />
      </section>
    </div>
  );
}

export default AdminCrudCastPage;
