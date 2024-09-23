import  { useState, useEffect } from "react";
import Swal from "sweetalert2";
import GridCrudComponent from "./components/GridCrud.component";
import NavBarAdmin from "./components/NavbarAdmin.component";
import './styles/crudmovies.css';
import FormCrudMovies from "./components/CrudMovies/Form.Movies";
import ContentDeleteAndEdit from "./components/ContentDeleteAndEdit";
import useAlert from "../../private/userMenu/components/alert.component"; // Importa el hook useAlert

// API Key de TMDb
const API_KEY = "a3c97fc58c271f7b5b5cc1c31b8ef888";
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

// Definir la interfaz para las propiedades de la película
interface MovieData {
    id: string;
    title: string;
    overview: string;
    cast: string;
    studio: string;
    category: string;
    subcategory: string;
    director: string;
    streamId: string;
    publishDate: string;
    image?: File | null;
}

export function AdminCrudMovie() {
    const [movies, setMovies] = useState<MovieData[]>([]);
    const [selectedMovie, setSelectedMovie] = useState<MovieData | null>(null);
    const { showAlert } = useAlert(); // Usa el hook useAlert

    // Obtener datos de películas populares desde TMDb
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch(API_URL);
                const data = await response.json();
                const formattedMovies: MovieData[] = data.results.map((movie: any) => ({
                    id: movie.id.toString(),
                    title: movie.title,
                    overview: movie.overview,
                    cast: "",
                    studio: "",
                    category: "",
                    subcategory: "",
                    director: "",
                    streamId: "",
                    publishDate: "",
                    image: null,
                }));
                setMovies(formattedMovies);
            } catch (error) {
                console.error("Error fetching movies from TMDb:", error);
            }
        };

        fetchMovies();
    }, []);

    // Función para guardar o editar una película
    const handleSaveMovie = (movieData: Omit<MovieData, "id">) => {
        if (selectedMovie) {
            // Editar película
            setMovies(movies.map(movie => movie.id === selectedMovie.id ? { ...selectedMovie, ...movieData } : movie));
            setSelectedMovie(null);
            showAlert("success", "Movie Edited", "The movie was edited successfully.");
        } else {
            // Crear nueva película
            const newMovie: MovieData = { id: Date.now().toString(), ...movieData };
            setMovies([...movies, newMovie]);
            showAlert("success", "Movie Created", "The movie was created successfully.");
        }
    };

    // Función para eliminar una película
    const handleDeleteMovie = async (id: string) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
            setMovies(movies.filter(movie => movie.id !== id));
            showAlert("success", "Movie Deleted", "The movie was deleted successfully.");
        }
    };

    // Función para seleccionar una película para editar
    const handleEditMovie = (id: string) => {
        const movie = movies.find(movie => movie.id === id);
        setSelectedMovie(movie || null);
    };

    return (
        <div className="admin-page-container">
            <div className="navbar-container">
                <NavBarAdmin />
            </div>
            <section className="container-all-crud">
                <GridCrudComponent
                    formContent={<FormCrudMovies selectedItem={selectedMovie} onSave={handleSaveMovie} />}
                    contentDeleteAndEdit={
                        movies.map(movie => (
                            <ContentDeleteAndEdit
                                key={movie.id}
                                name={movie.title}
                                id={movie.id}
                                onClickDelete={() => handleDeleteMovie(movie.id)}
                                onClickEdit={() => handleEditMovie(movie.id)}
                            />
                        ))
                    }
                />
            </section>
        </div>
    );
}
