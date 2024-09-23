import React, { useState, useEffect } from "react";
import ButtonSubmitAdmin from "../ButtonSubmit";
import Input from "../Input.Component";

// Definir la interfaz para las propiedades de la película
interface MovieData {
    id: string;
    title: string;
    overview: string; // Cambiado a overview
    cast: string;
    studio: string;
    category: string;
    subcategory: string;
    director: string;
    streamId: string;
    publishDate: string;
    image?: File | null; // La imagen es opcional
}

// Definir la interfaz para las propiedades que recibe el componente
interface FormCrudMoviesProps {
    selectedItem: MovieData | null; // La película seleccionada o null
    onSave: (movieData: Omit<MovieData, "id">) => void; // Función para guardar la película sin la propiedad id
}

const FormCrudMovies: React.FC<FormCrudMoviesProps> = ({ selectedItem, onSave }) => {
    // Estados para los campos del formulario
    const [title, setTitle] = useState<string>("");
    const [overview, setOverview] = useState<string>(""); // Estado para el overview
    const [cast, setCast] = useState<string>("");
    const [studio, setStudio] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [subcategory, setSubcategory] = useState<string>("");
    const [director, setDirector] = useState<string>("");
    const [streamId, setStreamId] = useState<string>("");
    const [publishDate, setPublishDate] = useState<string>("");
    const [image, setImage] = useState<File | null>(null);

    // Efecto para rellenar el formulario cuando se selecciona una película
    useEffect(() => {
        if (selectedItem) {
            setTitle(selectedItem.title);
            setOverview(selectedItem.overview); // Actualiza el estado con el overview
            setCast(selectedItem.cast);
            setStudio(selectedItem.studio);
            setCategory(selectedItem.category);
            setSubcategory(selectedItem.subcategory);
            setDirector(selectedItem.director);
            setStreamId(selectedItem.streamId);
            setPublishDate(selectedItem.publishDate);
            setImage(null); // No cargamos la imagen inicialmente en el formulario
        }
    }, [selectedItem]);

    // Manejar el envío del formulario
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (title.trim() !== "") {
            // Llamamos a la función onSave pasándole todos los datos del formulario
            onSave({
                title,
                overview, // Aquí pasamos el overview
                cast,
                studio,
                category,
                subcategory,
                director,
                streamId,
                publishDate,
                image, // Aquí pasamos el archivo de la imagen si fue cargado
            });

            // Limpiar los campos después de guardar
            setTitle("");
            setOverview(""); // Limpiar el overview
            setCast("");
            setStudio("");
            setCategory("");
            setSubcategory("");
            setDirector("");
            setStreamId("");
            setPublishDate("");
            setImage(null);
        }
    };

    return (
        <div>
            <h2 style={{ fontSize: "1.7rem", textAlign: "start" }}>
                {selectedItem ? "Edit Movie" : "Create New Movie"}
            </h2>
            <form className="form-create" onSubmit={handleSubmit}>
                <Input
                    type="text"
                    placeholder="Enter movie title"
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <Input
                    type="text"
                    placeholder="Enter movie overview"
                    label="Overview" // Cambiado a Overview
                    value={overview}
                    onChange={(e) => setOverview(e.target.value)}
                />
                <Input
                    type="text"
                    placeholder="Enter cast"
                    label="Cast"
                    value={cast}
                    onChange={(e) => setCast(e.target.value)}
                />
                <Input
                    type="text"
                    placeholder="Enter studio name"
                    label="Studio"
                    value={studio}
                    onChange={(e) => setStudio(e.target.value)}
                />
                <Input
                    type="text"
                    placeholder="Enter movie category"
                    label="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
                <Input
                    type="text"
                    placeholder="Enter movie subcategory"
                    label="Subcategory"
                    value={subcategory}
                    onChange={(e) => setSubcategory(e.target.value)}
                />
                <Input
                    type="text"
                    placeholder="Enter director's name"
                    label="Director"
                    value={director}
                    onChange={(e) => setDirector(e.target.value)}
                />
                <Input
                    type="text"
                    placeholder="Enter stream ID"
                    label="Stream ID"
                    value={streamId}
                    onChange={(e) => setStreamId(e.target.value)}
                />
                <Input
                    type="date"
                    label="Publish Date"
                    value={publishDate}
                    onChange={(e) => setPublishDate(e.target.value)} placeholder={""}                />
                <Input
                    type="file"
                    label="Image"
                    onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)} placeholder={""}                />
                <ButtonSubmitAdmin />
            </form>
        </div>
    );
};

export default FormCrudMovies;
