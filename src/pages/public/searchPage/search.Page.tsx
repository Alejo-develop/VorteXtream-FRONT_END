import { useEffect, useState } from "react";
import { HeaderSearchPage } from "./components/header.component";
import { MoviesByGenreComponent } from "./components/MoviesGenre.component";
import GenreSelect from "./components/GenreSelect";
import { CardProps } from "../../../common/interfaces/media.interface";
import FooterComponent from "../../../common/components/footer/footer.component";

type Genre = {
    genreId: number;
    genreName: string;
};

export default function SearchPage() {
    const [genres, setGenres] = useState<Genre[]>([]);
    const [selectedGenre, setSelectedGenre] = useState<number>(0); // Default to show all genres
    const [moviesByGenre, setMoviesByGenre] = useState<{ [key: number]: CardProps[] }>({});
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    useEffect(() => {
        const fetchGenres = async () => {
            const API_KEY = "a3c97fc58c271f7b5b5cc1c31b8ef888";
            const baseUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;

            try {
                const res = await fetch(baseUrl);

                if (!res.ok) {
                    setErrorMessage("An error occurred while fetching genres");
                    throw new Error("Fetch error");
                }

                const resToJson = await res.json();
                const genreList = resToJson.genres.map((genre: { id: number; name: string }) => ({
                    genreId: genre.id,
                    genreName: genre.name
                }));

                setGenres(genreList);
            } catch (err: any) {
                setErrorMessage(err.message || "An error occurred");
                console.error("Error fetching genres:", err);
            }
        };

        fetchGenres();
    }, []);

    useEffect(() => {
        const fetchMovies = async () => {
            const API_KEY = "a3c97fc58c271f7b5b5cc1c31b8ef888";
            const imageBaseUrl = "https://image.tmdb.org/t/p/w1280";
            
            try {
                const fetchedMovies: { [key: number]: CardProps[] } = {};
                
                if (selectedGenre === 0) {
                    // Fetch movies for all genres
                    for (const genre of genres) {
                        const baseUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=${genre.genreId}&page=1`;
                        const res = await fetch(baseUrl);

                        if (!res.ok) {
                            setErrorMessage("An error occurred while fetching data");
                            throw new Error("Fetch error");
                        }

                        const resToJson = await res.json();
                        const data = resToJson.results
                            .filter((media: CardProps) => media.backdrop_path && media.overview)
                            .map((media: CardProps) => ({
                                imageUrl: `${imageBaseUrl}${media.backdrop_path}`,
                                overview: media.overview,
                                title: media.title,
                                vote_average: media.vote_average,
                                id: media.id
                            }));

                        fetchedMovies[genre.genreId] = data;
                    }
                } else {
                    // Fetch movies for selected genre
                    const baseUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=${selectedGenre}&page=1`;
                    const res = await fetch(baseUrl);

                    if (!res.ok) {
                        setErrorMessage("An error occurred while fetching data");
                        throw new Error("Fetch error");
                    }

                    const resToJson = await res.json();
                    const data = resToJson.results
                        .filter((media: CardProps) => media.backdrop_path && media.overview)
                        .map((media: CardProps) => ({
                            imageUrl: `${imageBaseUrl}${media.backdrop_path}`,
                            overview: media.overview,
                            title: media.title,
                            vote_average: media.vote_average,
                            id: media.id
                        }));

                    fetchedMovies[selectedGenre] = data;
                }
                
                setMoviesByGenre(fetchedMovies);
                
            } catch (err: any) {
                setErrorMessage(err.message || "An error occurred");
                console.error("Error fetching data:", err);
            }
        };

        fetchMovies();
    }, [selectedGenre, genres]); // Add genres to the dependency array

    return (
        <div>
            <HeaderSearchPage />
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
