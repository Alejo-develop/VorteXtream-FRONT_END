import React, { useState } from 'react';
import '../styles/CardComponent.css';
import ButtonWatch from './ButtonWatch.component';
import StarRating from './StartRating.component';  // Importa el nuevo componente

type CardProps = {
    id: number;
    backdrop_path: string | null;
    overview: string;
    title: string;
    vote_average: number;
};

const CardComponent: React.FC<CardProps> = ({ backdrop_path, overview, title, vote_average }) => {
    const [hovered, setHovered] = useState(false);
    const imageUrl = backdrop_path ? `https://image.tmdb.org/t/p/w1280${backdrop_path}` : '';

    const truncateText = (text: string, maxLength: number) => {
        return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
    };

    return (
        <div 
            className="card"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {backdrop_path && <img src={imageUrl} alt={title} className="card-image" />}
            {hovered && (
                <div className="card-details-panel">
                    <h3>{title}</h3>
                    <p>{truncateText(overview, 100)}</p>
                    <div className="rating-and-watch">
                        <ButtonWatch />
                        <StarRating rating={vote_average} /> {/* Usa el componente para mostrar estrellas */}
                    </div>
                    
                </div>
            )}
        </div>
    );
};

export default CardComponent;
