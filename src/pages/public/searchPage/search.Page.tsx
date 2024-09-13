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

const API_KEY = "a3c97fc58c271f7b5b5cc1c31b8ef888";
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
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

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
