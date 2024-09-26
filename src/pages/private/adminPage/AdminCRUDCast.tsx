import { useEffect, useState } from "react";
import ContentDeleteAndEdit from "./components/ContentDeleteAndEdit";
import FormCrudCastComponent from "./components/CrudCast/Form.cast";
import GridCrudComponent from "./components/GridCrud.component";
import NavBarAdmin from "./components/NavbarAdmin.component";
import useAlert from "../../private/userMenu/components/alert.component";

interface Cast {
  id: string;
  name: string;
  imageUrl?: string;
}

export function AdminCrudCastPage() {
  // State to store list of cast items and selected cast item for editing
  const [items, setItems] = useState<Cast[]>([]);
  const [selectedItem, setSelectedItem] = useState<Cast | null>(null);
  const { showAlert } = useAlert();

  // URLs for API and image uploading
  const API_BASE_URL = `${import.meta.env.VITE_BACKEND_URL_JAVA}/casts`
  const IMAGES_URL = import.meta.env.VITE_BACKEND_URL_IMAGES;

  // Fetch cast items from API
  const fetchItems = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/readAll`);
      if (!response.ok) throw new Error("Error fetching data");
      const data = await response.json();
      setItems(data);  // Update state with fetched items
    } catch (error) {
      showAlert("error", "Error fetching items", "Could not fetch data from the API.");
    }
  };

  // Fetch cast items on component mount
  useEffect(() => {
    fetchItems();
  }, []);

  // Handle save operation (create or update cast)
  const handleSave = async (name: string, image: File | null): Promise<void> => {
    try {
      let imageUrl = "";

      // If an image is provided, upload it and get the URL
      if (image) {
        const formData = new FormData();
        formData.append("multipartFile", image);

        const imageResponse = await fetch(`${IMAGES_URL}/uploadImage`, {
          method: "POST",
          body: formData,
        });

        if (!imageResponse.ok) throw new Error("Error uploading image");
        const imageData = await imageResponse.json();
        imageUrl = imageData.url;
      }

      const castData = { name, imageUrl }; // Data for new or updated cast

      // If an item is selected, update it; otherwise, create a new one
      if (selectedItem) {
        const response = await fetch(`${API_BASE_URL}/update/${selectedItem.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(castData),
        });
        if (!response.ok) throw new Error("Error updating cast");
        showAlert("success", "Cast updated", "The cast has been successfully updated.");
      } else {
        const response = await fetch(`${API_BASE_URL}/create`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(castData),
        });
        if (!response.ok) throw new Error("Error creating cast");
        showAlert("success", "Cast created", "The cast has been successfully created.");
      }

      fetchItems(); // Refresh the list of items after the save
    } catch (error) {
      showAlert("error", "Error saving item", '');
    }
  };

  // Handle deletion of a cast item
  const deleteItem = async (item: Cast) => {
    try {
      const response = await fetch(`${API_BASE_URL}/delete/${item.id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Error deleting cast");
      showAlert("success", "Cast deleted", "The cast has been successfully deleted.");
      fetchItems(); // Refresh the list after deletion
    } catch (error) {
      showAlert("error", "Error deleting item", '');
    }
  };

  return (
    <div className="admin-page-container">
      <div className="navbar-container">
        <NavBarAdmin />  {/* Admin navigation bar */}
      </div>
      <section className="container-all-crud">
        <GridCrudComponent
          // Form for creating/editing a cast
          formContent={<FormCrudCastComponent selectedItem={selectedItem} onSave={handleSave} />}
          // List of items with edit and delete actions
          contentDeleteAndEdit={items.map((item) => (
            <ContentDeleteAndEdit
              key={item.id}
              name={item.name}
              id={item.id}
              onClickEdit={() => setSelectedItem(item)}  // Set selected item for editing
              onClickDelete={() => deleteItem(item)}    // Trigger delete action
            />
          ))}
        />
      </section>
    </div>
  );
}

export default AdminCrudCastPage;
