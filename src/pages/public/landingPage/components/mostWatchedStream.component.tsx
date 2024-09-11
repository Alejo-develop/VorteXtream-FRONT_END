import WatchNowButtonComponent from "../../../../common/components/watchNowButton/watchNow.component"
import { Autoplay, Pagination } from "swiper/modules";
import { SwiperSlide, Swiper} from "swiper/react";
import { useEffect, useState } from "react";

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

const MostWatchedStreamComponent = () => {
    const [data, setData] = useState<MovieData[]>([]);

    useEffect(() => {
      const fetchMovies = async () => {
        const API_KEY = "a3c97fc58c271f7b5b5cc1c31b8ef888";
        const baseUrl = "https://api.themoviedb.org/3/movie/popular?api_key=";
        const imageBaseUrl = "https://image.tmdb.org/t/p/w1280";
  
        try {
          const response = await fetch(
            `${baseUrl}${API_KEY}&language=en-US&page=2`
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

    const truncateText = (text: string, maxLength: number) => {
      return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
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
                      <p className="movie-sinopsis">{truncateText(data.overview || "", 400)}</p>
                      <WatchNowButtonComponent size="190"/>
                    </div>
                  </div>
                </SwiperSlide>
              </div>
            ))}
          </Swiper>
        )}
      </div>
    );
}

export default MostWatchedStreamComponent