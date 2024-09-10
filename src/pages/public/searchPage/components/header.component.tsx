import { useState, useEffect } from "react";
import Logo from "../../../../assets/img/Logo.png";
import { InputSearch } from "../../../../common/components/searchComponent/search.component";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules"; // Importar Pagination y Autoplay
import "swiper/css";
import "swiper/css/pagination";
import '../styles/headerSearchPage.css';
import ExplorerButtonComponent from "../../../../common/components/explorerButton/explorerButton.component";

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
            <nav>
                <div className="img-vortex">
                    <img src={Logo} alt="Logoimg" className="logo" />
                    <div className="explore">
                    <ExplorerButtonComponent />

                    </div>
                    
                </div>
            </nav>

            <header className="header-container">
                {banners.length > 0 && (
                    <Swiper
                        pagination={{ clickable: true }}
                        modules={[Pagination, Autoplay]} // Añadir Autoplay al array de módulos
                        autoplay={{
                            delay: 5000, // Cambia la imagen cada 5 segundos
                            disableOnInteraction: false, // No desactivar autoplay si el usuario interactúa
                        }}
                        className="mySwiper"
                    >
                        {banners.map((bannerUrl, index) => (
                            <SwiperSlide key={index}>
                                <div className="banner-container">
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
