import React, { useEffect, useState } from "react";
import ButtonSubmitAdmin from "../ButtonSubmit";
import Input from "../Input.Component";

export interface DirectorData {
    id: string;
    name: string;
    age: number;
    synopsis: string;
    nationality: string;
    image?: string | File | null; // Acepta File para la carga y string para la URL
}

interface FormCrudDirectorsProps {
    selectedItem: DirectorData | null;
    onSave: (directorData: Omit<DirectorData, "id">) => void; // Exclude id from the data passed to onSave
}

const FormCrudDirectors: React.FC<FormCrudDirectorsProps> = ({ selectedItem, onSave }) => {
    const [name, setName] = useState<string>(selectedItem?.name || "");
    const [age, setAge] = useState<number>(selectedItem?.age || 0);
    const [synopsis, setSynopsis] = useState<string>(selectedItem?.synopsis || "");
    const [nationality, setNationality] = useState<string>(selectedItem?.nationality || "");
    const [image, setImage] = useState<File | null>(selectedItem?.image instanceof File ? selectedItem.image : null); // Ajuste aquí

    useEffect(() => {
        if (selectedItem) {
            setName(selectedItem.name);
            setAge(selectedItem.age);
            setSynopsis(selectedItem.synopsis);
            setNationality(selectedItem.nationality);
            setImage(selectedItem.image instanceof File ? selectedItem.image : null); // Verifica el tipo
        } else {
            setName("");
            setAge(0);
            setSynopsis("");
            setNationality("");
            setImage(null);
        }
    }, [selectedItem]);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSave({ name, age, synopsis, nationality, image });
    };

    return (
        <div>
            <h2 style={{ fontSize: '1.7rem', textAlign: 'start' }}>
                {selectedItem ? "Edit Director" : "Create New Director"}
            </h2>
            <form className="form-create" onSubmit={handleSubmit}>
                <Input 
                    type="text" 
                    placeholder="name" 
                    label="Name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                />
                <Input 
                    type="number" 
                    placeholder="age" 
                    label="Age" 
                    value={age.toString()} 
                    onChange={(e) => setAge(Number(e.target.value))} 
                />
                <Input 
                    type="text" 
                    placeholder="synopsis" 
                    label="Synopsis" 
                    value={synopsis} 
                    onChange={(e) => setSynopsis(e.target.value)} 
                />
                <Input 
                    type="text" 
                    placeholder="nationality" 
                    label="Nationality" 
                    value={nationality} 
                    onChange={(e) => setNationality(e.target.value)} 
                />
                <Input 
                    type="file" 
                    label="Image" 
                    placeholder=""
                    onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                            setImage(e.target.files[0]); // Set the selected image file
                        } else {
                            setImage(null); // If no file is selected, set image to null
                        }
                    }} 
                />
                <div style={{ marginTop: "30px", marginRight: "90px" }}>
                    <ButtonSubmitAdmin />
                </div>
            </form>
        </div>
    );
};

export default FormCrudDirectors;
