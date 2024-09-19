// FormCrudCastComponent.tsx

import React, { useState, useEffect } from "react";
import ButtonSubmitAdmin from "../ButtonSubmit";
import Input from "../Input.Component";

// Definir la interfaz para las propiedades
interface FormCrudCastComponentProps {
  selectedItem: { id: string; name: string } | null;
  onSave: (name: string, image: File | null) => void;
}

const FormCrudCastComponent: React.FC<FormCrudCastComponentProps> = ({ selectedItem, onSave }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    if (selectedItem) {
      setName(selectedItem.name);
    }
  }, [selectedItem]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (name.trim() !== "") {
      onSave(name, image); 
      setName("");
      setImage(null); 
    }
  };

  return (
    <div>
      <h2 style={{ fontSize: "1.7rem", textAlign: "start" }}>
        {selectedItem ? "Edit Director" : "Create New Director"}
      </h2>
      <form className="form-create" onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Name"
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="file"
          placeholder="Image"
          label="Image"
          onChange={(e) => e.target.files && setImage(e.target.files[0])}
        />
        <div style={{ marginTop: "30px", marginRight: "90px" }}>
          <ButtonSubmitAdmin />
        </div>
      </form>
    </div>
  );
};

export default FormCrudCastComponent;
