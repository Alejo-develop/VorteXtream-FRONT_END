import { useEffect, useState, useCallback } from "react";
import { HeaderSearchPage } from "./components/header.component";
import { MoviesByGenreComponent } from "./components/MoviesGenre.component";
import GenreSelect from "./components/GenreSelect";
import { CardProps } from "../../../common/interfaces/media.interface";
import FooterComponent from "../../../common/components/footer/footer.component";
import HeaderComponent from "../../../common/components/header/header.component";
import CardComponent from '../../../common/components/sliderCards.component/sliderCard.component'; // Importar tu componente de carta

type Genre = {
    genreId: number;
    genreName: string;
};

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const fetchJson = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error("Fetch error");
    }
    return res.json();
};

export default function SearchPage() {
    const [genres, setGenres] = useState<Genre[]>([]);
    const [selectedGenre, setSelectedGenre] = useState<number>(0);
    const [moviesByGenre, setMoviesByGenre] = useState<{ [key: number]: CardProps[] }>({});
    const [searchResults, setSearchResults] = useState<CardProps[]>([]); // Estado para resultados de búsqueda
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    // Función de búsqueda de películas
    const searchMovies = useCallback(async (query: string) => {
        if (!query) return; // Si no hay query, no buscar

        try {
            const searchUrl = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`;
            const data = await fetchJson(searchUrl);
            const filteredResults = data.results
                .filter((media: CardProps) => media.backdrop_path && media.overview)
                .map((media: CardProps) => ({
                    id: media.id,
                    backdrop_path: media.backdrop_path,
                    overview: media.overview,
                    title: media.title,
                    vote_average: media.vote_average,
                }));
            setSearchResults(filteredResults);
        } catch (error) {
            setErrorMessage("An error occurred while fetching search results");
            console.error("Error fetching search results:", error);
        }
    }, []);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const genreData = await fetchJson(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`);
                const genreList = genreData.genres.map((genre: { id: number; name: string }) => ({
                    genreId: genre.id,
                    genreName: genre.name
                }));
                setGenres(genreList);
            } catch (err) {
                setErrorMessage("An error occurred while fetching genres");
                console.error("Error fetching genres:", err);
            }
        };

        fetchGenres();
    }, []);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const fetchedMovies: { [key: number]: CardProps[] } = {};
                const genreIds = selectedGenre === 0 ? genres.map(genre => genre.genreId) : [selectedGenre];
                const imageBaseUrl = "https://image.tmdb.org/t/p/w1280";

                for (const genreId of genreIds) {
                    const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=${genreId}&page=1`;
                    const movieData = await fetchJson(url);

                    const data = movieData.results
                        .filter((media: CardProps) => media.backdrop_path && media.overview)
                        .map((media: CardProps) => ({
                            imageUrl: `${imageBaseUrl}${media.backdrop_path}`,
                            overview: media.overview,
                            title: media.title,
                            vote_average: media.vote_average,
                            id: media.id
                        }));

                    fetchedMovies[genreId] = data;
                }

                setMoviesByGenre(fetchedMovies);
            } catch (err) {
                setErrorMessage("An error occurred while fetching data");
                console.error("Error fetching data:", err);
            }
        };

        fetchMovies();
    }, [selectedGenre, genres]);

    return (
        <div className="container-search-page">
            {/* Mueve el HeaderComponent aquí si debe aparecer en la parte superior */}
            <HeaderComponent />

            <HeaderSearchPage onSearch={searchMovies} /> {/* Asegúrate de que este componente ocupe todo el ancho */}

            {/* Resultados de búsqueda */}
            {searchResults.length > 0 && (
                <div className="search-results">
                    {searchResults.map((movie) => (
                        <CardComponent
                            key={movie.id}
                            id={movie.id}
                            backdrop_path={movie.backdrop_path}
                            overview={movie.overview}
                            title={movie.title}
                            vote_average={movie.vote_average}
                        />
                    ))}
                </div>
            )}

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <GenreSelect
                genres={genres}
                selectedGenre={selectedGenre}
                onGenreChange={setSelectedGenre}
            />
            <MoviesByGenreComponent
                genres={selectedGenre === 0 ? genres : genres.filter(genre => genre.genreId === selectedGenre)}
                moviesByGenre={moviesByGenre}
            />
            <FooterComponent />
        </div>
    );
}
