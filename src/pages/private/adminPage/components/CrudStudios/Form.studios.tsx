import React, { useState, useEffect } from "react";
import Input from "../Input.Component";
import ButtonSubmitAdmin from "../ButtonSubmit";

// Define the type for studio data
export interface StudioData {
    id: string;
    name: string;
    country: string;
    foundationYear: number;
}

interface FormCrudStudiosProps {
    selectedItem: StudioData | null;
    onSave: (studioData: Omit<StudioData, "id">) => void; // Exclude id from the data passed to onSave
}

const FormStudios: React.FC<FormCrudStudiosProps> = ({ selectedItem, onSave }) => {
    const [name, setName] = useState(selectedItem?.name || "");
    const [country, setCountry] = useState(selectedItem?.country || "");
    const [foundationYear, setFoundationYear] = useState(selectedItem?.foundationYear || 0);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSave({ name, country, foundationYear });
    };

    useEffect(() => {
        if (selectedItem) {
            setName(selectedItem.name);
            setCountry(selectedItem.country);
            setFoundationYear(selectedItem.foundationYear);
        }
    }, [selectedItem]);

    return (
        <div>
            <h2 style={{ fontSize: "1.7rem", textAlign: "start" }}>
                {selectedItem ? "Edit Studio" : "Create New Studio"}
            </h2>
            <form className="form-create" onSubmit={handleSubmit}>
                <Input type="text" placeholder="name" label="Name Studio" value={name} onChange={(e) => setName(e.target.value)} />
                <Input type="text" placeholder="country" label="Country" value={country} onChange={(e) => setCountry(e.target.value)} />
                <Input type="number" placeholder="foundation year" label="Foundation Year" value={foundationYear} onChange={(e) => setFoundationYear(Number(e.target.value))} />
                <div style={{ marginTop: "30px", marginRight: "90px" }}>
                    <ButtonSubmitAdmin />
                </div>
            </form>
        </div>
    );
};

export default FormStudios;
