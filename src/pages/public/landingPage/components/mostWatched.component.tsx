import { useEffect, useState } from "react";
import WatchNowButtonComponent from "../../../../common/components/watchNowButton/watchNow.component";
import "../styles/mostWatchedMedia.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

type Movie = {
  id: string;
  backdrop_path: string | null;
  overview: string | null;
  title: string;
  vote_average: number
};

type MovieData = {
  id: string; // Asegúrate de incluir `id` en MovieData para usarlo en `key`
  imageUrl: string;
  overview: string ;
  title: string;
  vote_average: number
};

const MostWatchedMediaComponent = () => {
  const [data, setData] = useState<MovieData[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const API_KEY = "a3c97fc58c271f7b5b5cc1c31b8ef888";
      const baseUrl = "https://api.themoviedb.org/3/movie/popular?api_key=";
      const imageBaseUrl = "https://image.tmdb.org/t/p/w1280";

      try {
        const response = await fetch(
          `${baseUrl}${API_KEY}&language=en-US&page=5`
        );
        const data = await response.json();

        const movieData = data.results
          .filter((movie: Movie) => movie.backdrop_path && movie.overview)
          .map((movie: Movie) => ({
            id: movie.id, // Incluye `id` en el objeto de datos
            imageUrl: `${imageBaseUrl}${movie.backdrop_path}`,
            overview: movie.overview,
            title: movie.title,
            vote_average: movie.vote_average
          }));

        setData(movieData);
      } catch (error) {
        console.error("Error fetching the banners:", error);
      }
    };

    fetchMovies();
  }, []);

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  };

  return (
    <div className="container">
      {data.length > 0 && (
        <Swiper
          pagination={{ clickable: true }}
          modules={[Pagination, Autoplay]}
          autoplay={{
            delay: 5000, // Cambia la imagen cada 5 segundos
            disableOnInteraction: false, // No desactivar autoplay si el usuario interactúa
          }}
          className="mySwipe"
        >
          {data.map((movie) => (
            <SwiperSlide key={movie.id}>
              {" "}
              {/* Usa el `id` como `key` */}
              <div className="mostPopular-container">
                <img
                  src={movie.imageUrl}
                  alt={`Movie Banner ${movie.id}`} // Usa el `id` en el alt para la accesibilidad
                  className="banner-image"
                />
                <div className="container-info-movie">
                  <h2 className="mostWatched-title">Most watched...</h2>
                  <h2 className="movie-title">{movie.title}</h2>
                  <div className="sinopsis-container">
                    <p className="movie-sinopsis">
                      {truncateText(movie.overview || "", 400)}
                    </p>
                    <WatchNowButtonComponent id={movie.id} imgMedia={movie.imageUrl} synopsis={movie.overview} mediaTitle={movie.title} rating={movie.vote_average} size="190" height="45" text="Watch Now" fontweight="1rem"/>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default MostWatchedMediaComponent;
