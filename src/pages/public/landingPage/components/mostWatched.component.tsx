import { useEffect, useState } from "react";
import WatchNowButtonComponent from "../../../../common/components/watchNowButton/watchNow.component";
import "../styles/mostWatchedMedia.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

type Movie = {
  id: number;
  backdrop_path: string | null;
  overview: string | null;
  title: string;
};

type MovieData = {
  imageUrl: string;
  overview: string | null;
  title: string;
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
          `${baseUrl}${API_KEY}&language=en-US&page=1`
        );
        const data = await response.json();

        const movieData = data.results
          .filter((movie: Movie) => movie.backdrop_path && movie.overview)
          .map((movie: Movie) => ({
            imageUrl: `${imageBaseUrl}${movie.backdrop_path}`,
            overview: movie.overview,
            title: movie.title,
          }));

        setData(movieData);
      } catch (error) {
        console.error("Error fetching the banners:", error);
      }
    };

    fetchMovies();
  }, []);

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
          className="mySwiper"
        >
          {data.map((data, index) => (
            <div className="mostPopular-container">
              <SwiperSlide key={index}>
                <img
                  src={data.imageUrl}
                  alt={`Movie Banner ${index + 1}`}
                  className="banner-image"
                />
                <div className="container-info-movie">
                  <h2 className="mostWatched-title">Most watched...</h2>
                  <h2 className="movie-title">{data.title}</h2>

                  <div className="sinopsis-container">
                    <p className="movie-sinopsis">{data.overview}</p>
                    <WatchNowButtonComponent />
                  </div>
                </div>
              </SwiperSlide>
            </div>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default MostWatchedMediaComponent;
