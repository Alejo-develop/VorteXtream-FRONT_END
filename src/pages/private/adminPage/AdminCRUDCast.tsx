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
  const [items, setItems] = useState<Cast[]>([]);
  const [selectedItem, setSelectedItem] = useState<Cast | null>(null);
  const { showAlert } = useAlert();

  // Base URL desde .env
  const API_BASE_URL = `${import.meta.env.VITE_BACKEND_URL_JAVA}/casts`
  const IMAGES_URL = import.meta.env.VITE_BACKEND_URL_IMAGES;

  const fetchItems = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/readAll`);
      if (!response.ok) throw new Error("Error fetching data");
      const data = await response.json();
      setItems(data);
    } catch (error) {
      showAlert("error", "Error fetching items", "Could not fetch data from the API.");
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSave = async (name: string, image: File | null): Promise<void> => {
    try {
      let imageUrl = "";

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

      const castData = { name, imageUrl };

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

      fetchItems();
    } catch (error) {
      showAlert("error", "Error saving item", '');
    }
  };

  const deleteItem = async (item: Cast) => {
    try {
      const response = await fetch(`${API_BASE_URL}/delete/${item.id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Error deleting cast");
      showAlert("success", "Cast deleted", "The cast has been successfully deleted.");
      fetchItems();
    } catch (error) {
      showAlert("error", "Error deleting item", '');
    }
  };

  return (
    <div className="admin-page-container">
      <NavBarAdmin />
      <section className="container-all-crud">
        <GridCrudComponent
          formContent={<FormCrudCastComponent selectedItem={selectedItem} onSave={handleSave} />}
          contentDeleteAndEdit={items.map((item) => (
            <ContentDeleteAndEdit
              key={item.id}
              name={item.name}
              id={item.id}
              onClickEdit={() => setSelectedItem(item)}
              onClickDelete={() => deleteItem(item)}
            />
          ))}
        />
      </section>
    </div>
  );
}

export default AdminCrudCastPage;
