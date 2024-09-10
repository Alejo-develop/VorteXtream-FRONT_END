import React from 'react';
import '../styles/CardComponent.css'; // Asegúrate de tener estilos para las tarjetas

type CardProps = {
    id: number;
    backdrop_path: string | null;
    overview: string;
    title: string;
};

const CardComponent: React.FC<CardProps> = ({ id, backdrop_path, overview, title }) => {
    const imageUrl = backdrop_path ? `https://image.tmdb.org/t/p/w1280${backdrop_path}` : '';

    return (
        <div className="card">
            {backdrop_path && <img src={imageUrl} alt={title} className="card-image" />}
            <div className="card-content">
                <h3 className="card-title">{title}</h3>
                <p className="card-overview">{overview}</p>
            </div>
        </div>
    );
};

export default CardComponent;
