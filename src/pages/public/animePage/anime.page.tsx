import SwiperComponent from "../../../common/components/sliderCards.component/swiperComponent/swiperSlider.component";
import CardAnime, { CardAnimeProps } from "./components/CardAnime";
import { useState, useEffect } from 'react';
import './styles/headeranimes.css';
import HeaderComponent from "../../../common/components/header/header.component";
import { HeaderAnime } from "./components/HeaderAnime.component";

interface AnimeInfo extends CardAnimeProps {}

export function AnimePage() {
    const [animes, setAnimes] = useState<AnimeInfo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchAnimes = async () => {
            try {
                const response = await fetch(`https://api.jikan.moe/v4/top/anime?page=${page}&limit=25`);
                if (!response.ok) throw new Error('Network response was not ok');
                const { data, pagination } = await response.json();

                if (!data) throw new Error('Invalid data structure');

                const animeList: AnimeInfo[] = data.map((anime: any) => ({
                    id: anime.mal_id,
                    title_japonese: anime.title_japanese || "No Japanese title available",
                    title_english: anime.title_english || "No English title available",
                    image_url: anime.images.jpg.large_image_url,
                    synopsis: anime.synopsis || "No synopsis available",
                }));

                setAnimes(prevAnimes => [...prevAnimes, ...animeList]);
                setTotalPages(pagination.last_visible_page);
            } catch (error) {
                
            } finally {
                setLoading(false);
            }
        };

        fetchAnimes();
    }, [page]);

    const loadMoreAnimes = () => {
        if (page < totalPages) setPage(prevPage => prevPage + 1);
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    const groupedAnimes = (array: AnimeInfo[], groupSize: number) => 
        Array.from({ length: Math.ceil(array.length / groupSize) }, (_, i) =>
            array.slice(i * groupSize, i * groupSize + groupSize)
        );

    return (
        <div>
            <HeaderComponent />
            <HeaderAnime />
            <div className="anime-section">
                {groupedAnimes(animes, 10).map((group, index) => (
                    <div className="swiper-container" key={index}>
                        <SwiperComponent spaceBetween={10} slidesPerView={3}>
                            {group.map(anime => (
                                <CardAnime
                                    key={anime.id}
                                    id={anime.id}
                                    title_japonese={anime.title_japonese}
                                    title_english={anime.title_english}
                                    image_url={anime.image_url}
                                    synopsis={anime.synopsis}
                                />
                            ))}
                        </SwiperComponent>
                    </div>
                ))}
                <button 
                    className="load-more-button"
                    onClick={loadMoreAnimes}
                    disabled={loading || page >= totalPages}
                >
                    {loading ? 'Loading more...' : 'Load More'}
                </button>
            </div>
        </div>
    );
}
