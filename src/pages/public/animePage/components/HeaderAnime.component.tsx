import React from 'react';

// Definir la interfaz AnimeInfo
export interface AnimeInfo {
    id: string;
    title_japonese: string;
    title_english: string;
    image_url: string;
    synopsis: string;
}

interface HeaderAnimeProps {
    animes: AnimeInfo[];
}

export const HeaderAnime: React.FC<HeaderAnimeProps> = ({ animes }) => {
    return (
        <div className="header-anime-container">
            {animes.map((anime) => (
                <div key={anime.id} className="anime-item">
                    <img 
                        src={anime.image_url} 
                        alt={anime.title_japonese} 
                        className="anime-image" 
                    />
                    <div className="anime-title">
                        {anime.title_japonese}
                        {anime.title_english}
                    </div>
                </div>
            ))}
        </div>
    );
};
