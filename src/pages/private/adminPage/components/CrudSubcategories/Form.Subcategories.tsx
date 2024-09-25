import React, { useState, useEffect } from "react";
import Input from "../Input.Component";
import ButtonSubmitAdmin from "../ButtonSubmit";

// Define the type for subcategory data
export interface SubcategoriesData {
    id: string;
    name: string;
    description: string;
}

interface FormCrudSubCategoriesProps {
    selectedItem: SubcategoriesData | null;
    onSave: (subcategoryData: Omit<SubcategoriesData, "id">) => void; // Exclude id from the data passed to onSave
}

const FormSubCategories: React.FC<FormCrudSubCategoriesProps> = ({ selectedItem, onSave }) => {
    const [name, setName] = useState(selectedItem?.name || "");
    const [description, setDescription] = useState(selectedItem?.description || "");

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSave({ name, description });
    };

    useEffect(() => {
        if (selectedItem) {
            setName(selectedItem.name);
            setDescription(selectedItem.description);
        }
    }, [selectedItem]);

    return (
        <div>
            <h2 style={{ fontSize: "1.7rem", textAlign: "start" }}>
                {selectedItem ? "Edit Subcategory" : "Create New Subcategory"}
            </h2>
            <form className="form-create" onSubmit={handleSubmit}>
                <Input type="text" placeholder="name" label="Name Subcategory" value={name} onChange={(e) => setName(e.target.value)} />
                <Input type="text" placeholder="description" label="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                <div style={{ marginTop: "30px", marginRight: "90px" }}>
                    <ButtonSubmitAdmin />
                </div>
            </form>
        </div>
    );
};

export default FormSubCategories;
