import React, { useEffect, useState } from "react";
import ButtonSubmitAdmin from "../ButtonSubmit";
import Input from "../Input.Component";

export interface DirectorData {
  id: string;
  name: string;
  age: number;
  synopsis: string;
  image?: File | null;
}

interface FormCrudDirectorsProps {
    selectedItem: DirectorData | null;
    onSave: (directorData: Omit<DirectorData, "id">) => void;
}

const FormCrudDirectors: React.FC<FormCrudDirectorsProps> = ({ selectedItem, onSave }) => {
    const [name, setName] = useState(selectedItem?.name || "");
    const [age, setAge] = useState(selectedItem?.age || 0);
    const [synopsis, setSynopsis] = useState(selectedItem?.synopsis || "");
    const [image, setImage] = useState<File | null>(selectedItem?.image || null);

    // Actualizar el estado cuando cambia selectedItem
    useEffect(() => {
        if (selectedItem) {
            setName(selectedItem.name);
            setAge(selectedItem.age);
            setSynopsis(selectedItem.synopsis);
            setImage(selectedItem.image || null);
        } else {
            setName("");
            setAge(0);
            setSynopsis("");
            setImage(null);
        }
    }, [selectedItem]);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSave({ name, age, synopsis, image });
    };

    return (
        <div>
            <h2 style={{ fontSize: '1.7rem', textAlign: 'start' }}>
                {selectedItem ? "Edit Director" : "Create New Director"}
            </h2>
            <form className="form-create" onSubmit={handleSubmit}>
                <Input type="text" placeholder="name" label="Name" value={name} onChange={(e) => setName(e.target.value)} />
                <Input type="number" placeholder="age" label="Age" value={age.toString()} onChange={(e) => setAge(Number(e.target.value))} />
                <Input type="text" placeholder="synopsis" label="Synopsis" value={synopsis} onChange={(e) => setSynopsis(e.target.value)} />
                <Input type="file" placeholder="image" label="Image" onChange={(e) => e.target.files && setImage(e.target.files[0])} />
                <div style={{ marginTop: "30px", marginRight: "90px" }}>
                    <ButtonSubmitAdmin />
                </div>
            </form>
        </div>
    );
};

export default FormCrudDirectors;
