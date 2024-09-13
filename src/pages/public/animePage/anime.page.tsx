import React, { useState, useEffect } from "react";
import CardAnime, { CardAnimeProps } from "./components/CardAnime";
import './styles/headeranimes.css';
import HeaderComponent from "../../../common/components/header/header.component";
import { HeaderAnime } from "./components/HeaderAnime.component";
import SearchAnime from "./components/SearchAnime";

interface AnimeInfo extends CardAnimeProps {}

export function AnimePage() {
    const [animes, setAnimes] = useState<AnimeInfo[]>([]);
    const [searchResults, setSearchResults] = useState<AnimeInfo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [query, setQuery] = useState<string>("");

    // Fetch top animes for default display (initial fetch)
    useEffect(() => {
        const fetchAnimes = async () => {
            setLoading(true);
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

                // Concatenate new animes with existing ones
                setAnimes(prevAnimes => {
                    // Filter out duplicates
                    const existingIds = new Set(prevAnimes.map(anime => anime.id));
                    const newAnimes = animeList.filter(anime => !existingIds.has(anime.id));
                    return [...prevAnimes, ...newAnimes];
                });
                setTotalPages(pagination.last_visible_page);
            } catch (error) {
                // setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAnimes();
    }, [page]);

    // Debounce search query and fetch search results
    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            fetchSearchResults(query);
        }, 500); // Debounce for 500ms

        return () => clearTimeout(debounceTimer);
    }, [query]);

    // Fetch search results based on query
    const fetchSearchResults = async (query: string) => {
        if (!query) return;

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`https://api.jikan.moe/v4/anime?q=${query}&limit=25`);
            if (!response.ok) throw new Error('Network response was not ok');
            const { data } = await response.json();

            if (!data) throw new Error('Invalid data structure');

            const animeList: AnimeInfo[] = data.map((anime: any) => ({
                id: anime.mal_id,
                title_japonese: anime.title_japanese || "No Japanese title available",
                title_english: anime.title_english || "No English title available",
                image_url: anime.images.jpg.large_image_url,
                synopsis: anime.synopsis || "No synopsis available",
            }));

            setSearchResults(animeList);
        } catch (error) {
            // setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Load more animes for pagination
    const loadMoreAnimes = () => {
        if (page < totalPages) setPage(prevPage => prevPage + 1);
    };

    // Determine which animes to display based on search or pagination
    const displayedAnimes = query ? searchResults : animes;

    // Group animes in chunks for SwiperComponent
    const groupedAnimes = (array: AnimeInfo[], groupSize: number) =>
        Array.from({ length: Math.ceil(array.length / groupSize) }, (_, i) =>
            array.slice(i * groupSize, i * groupSize + groupSize)
        );

    return (
        <div>
            <HeaderComponent />
            <HeaderAnime animes={animes.slice(4,9)} /> 
            <div className="anime-section">
                <div className="search-anime">
                    <SearchAnime onSearch={setQuery} />
                </div>
                {/* Display anime results in grouped format */}
                {groupedAnimes(displayedAnimes, 8).map((group, index) => (
                    <div className="swiper-container" key={index}>
                        <div className="cards-anime">
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
                        </div>
                    </div>
                ))}

                {/* Load More Button */}
                {!query && (
                    <button 
                        className="load-more-button"
                        onClick={loadMoreAnimes}
                        disabled={loading || page >= totalPages}
                    >
                        {loading ? 'Loading more...' : 'Load More'}
                    </button>
                )}
            </div>
        </div>
    );
}
