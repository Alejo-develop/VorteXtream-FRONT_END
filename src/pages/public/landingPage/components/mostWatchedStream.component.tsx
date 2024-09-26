import WatchNowButtonComponent from "../../../../common/components/watchNowButton/watchNow.component"
import { Autoplay, Pagination } from "swiper/modules";
import { SwiperSlide, Swiper} from "swiper/react";
import { useEffect, useState } from "react";

type Movie = {
    id: string;
    backdrop_path: string;
    overview: string ;
    title: string;
    vote_average: number
  };
  
  type MovieData = {
    id: string;
    imageUrl: string;
    overview: string ;
    title: string;
    vote_average: number
  };

const MostWatchedStreamComponent = () => {
    const [data, setData] = useState<MovieData[]>([]);

    useEffect(() => {
      const fetchMovies = async () => {
        const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
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
              id: movie.id,
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

      //formats the text to give it a maximum number of characters
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
              delay: 5000, 
              disableOnInteraction: false, 
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
                      <WatchNowButtonComponent id={data.id} imgMedia={data.imageUrl} synopsis={data.overview} rating={data.vote_average} mediaTitle={data.title} size="190" height="45" text="Watch Now" fontweight="1rem"/>
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