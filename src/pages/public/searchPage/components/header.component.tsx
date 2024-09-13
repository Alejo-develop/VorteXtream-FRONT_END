import { useState, useEffect } from "react";
import { InputSearch } from "../../../../common/components/searchComponent/search.component";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules"; // Importar Pagination y Autoplay
import "swiper/css";
import "swiper/css/pagination";
import '../styles/headerSearchPage.css';

type Movie = {
    id: number;
    backdrop_path: string | null;
};

export const HeaderSearchPage = () => {
    const [banners, setBanners] = useState<string[]>([]);

    useEffect(() => {
        const fetchBanners = async () => {
            const API_KEY = 'a3c97fc58c271f7b5b5cc1c31b8ef888';
            const baseUrl = 'https://api.themoviedb.org/3/movie/popular?api_key=';
            const imageBaseUrl = 'https://image.tmdb.org/t/p/w1280';

            try {
                const response = await fetch(`${baseUrl}${API_KEY}&language=en-US&page=1`);
                const data = await response.json();

                const bannerUrls = data.results
                    .filter((movie: Movie) => movie.backdrop_path)
                    .map((movie: Movie) => `${imageBaseUrl}${movie.backdrop_path}`);

                setBanners(bannerUrls);
            } catch (error) {
                console.error("Error fetching the banners:", error);
            }
        };

        fetchBanners();
    }, []);

    return (
        <div className="general">
         

            <header className="header-container">
                {banners.length > 0 && (
                    <Swiper
                        pagination={{ clickable: true }}
                        modules={[Pagination, Autoplay]} 
                        autoplay={{
                            delay: 5000, // Cambia la imagen cada 5 segundos
                            disableOnInteraction: false, 
                        }}
                        className="mySwiper"
                    >
                        {banners.map((bannerUrl, index) => (
                            <SwiperSlide key={index}>
                                <div className="banner-container-searchPage">
                                    <img src={bannerUrl} alt={`Movie Banner ${index + 1}`} className="banner-image" />
                                    <div className="overlay">
                                        <InputSearch />
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
               
            </header>
        </div>
    );
};
