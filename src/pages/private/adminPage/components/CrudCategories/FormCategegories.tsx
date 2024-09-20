import React from "react";
import Input from "../Input.Component";
import ButtonSubmitAdmin from "../ButtonSubmit";

interface CategoryData {
    id: string;
    name: string;
    description: string;
}

interface FormCrudCategoriesProps {
    selectedItem: CategoryData | null;
    onSave: (categoryData: Omit<CategoryData, "id">) => void;
}

const FormCrudCategories: React.FC<FormCrudCategoriesProps> = ({ selectedItem, onSave }) => {
    const [name, setName] = React.useState(selectedItem?.name || "");
    const [description, setDescription] = React.useState(selectedItem?.description || "");

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSave({ name, description });
    };

    return (
        <div>
            <h2 style={{ fontSize: "1.7rem", textAlign: "start" }}>
                {selectedItem ? "Edit Category" : "Create New Category"}
            </h2>
            <form className="form-create" onSubmit={handleSubmit}>
                <Input type="text" placeholder="name" label="Name Category" value={name} onChange={(e) => setName(e.target.value)} />
                <Input type="text" placeholder="description" label="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                <div style={{ marginTop: "30px", marginRight: "90px" }}>
                    <ButtonSubmitAdmin />
                </div>
            </form>
        </div>
    );
};

export { FormCrudCategories };
