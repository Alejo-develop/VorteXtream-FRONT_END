import React, { useState, useEffect } from 'react';
import CardComponent from './CardComponent'; 
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation'; // Importa el CSS para la navegación
import './style/CardGenreComponent.css'

type Movie = {
    id: number;
    backdrop_path: string | null;
    overview: string;
    title: string;
    vote_average: number;  
};

type Genre = {
    id: number;
    name: string;
};

const CardGenreComponent: React.FC = () => {
    const [moviesByGenre, setMoviesByGenre] = useState<{ [key: number]: Movie[] }>({});
    const [genres, setGenres] = useState<Genre[]>([]);

    const fetchMoviesByGenre = async (genreId: number) => {
        const API_KEY = 'a3c97fc58c271f7b5b5cc1c31b8ef888';
        const baseUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`;

        try {
            const response = await fetch(baseUrl);
            const data = await response.json();
            setMoviesByGenre((prev) => ({
                ...prev,
                [genreId]: data.results,
            }));
        } catch (error) {
            console.error(`Error fetching movies for genre ${genreId}:`, error);
        }
    };

    useEffect(() => {
        const fetchGenres = async () => {
            const API_KEY = 'a3c97fc58c271f7b5b5cc1c31b8ef888';
            const genreUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en`;

            try {
                const response = await fetch(genreUrl);
                const data = await response.json();
                setGenres(data.genres);
            } catch (error) {
                console.error("Error fetching genres:", error);
            }
        };

        fetchGenres();
    }, []);

    useEffect(() => {
        if (genres.length > 0) {
            genres.forEach((genre) => fetchMoviesByGenre(genre.id));
        }
    }, [genres]);

    return (
        <div className="card-genre-container">
            {genres.map((genre) => (
                <div key={genre.id}>
                    <h1 className='title'>{genre.name}</h1>
                    {moviesByGenre[genre.id] && moviesByGenre[genre.id].length > 0 && (
                        <Swiper
                          
                            navigation={true} // Activa la navegación con flechas
                            modules={[Pagination, Autoplay, Navigation]}
                            autoplay={{
                                delay: 10000,
                                disableOnInteraction: false,
                            }}
                            slidesPerView={5} // Muestra 5 cartas por vista
                            spaceBetween={5} // Espacio entre las cartas
                            className="mySwiper"
                        >
                            {moviesByGenre[genre.id].map((movie) => (
                                <SwiperSlide key={movie.id}>
                                    <CardComponent
                                        id={movie.id}
                                        backdrop_path={movie.backdrop_path}
                                        overview={movie.overview}
                                        title={movie.title}
                                        vote_average={movie.vote_average}  // Añade la puntuación a cada carta
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    )}
                </div>
            ))}
        </div>
    );
};

export default CardGenreComponent;
