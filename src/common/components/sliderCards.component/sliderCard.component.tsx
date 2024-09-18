import React, { useState } from 'react';
import './CardComponent.css';
import StarRating from '../../../pages/public/searchPage/components/StartRating.component';
import WatchNowButtonComponent from '../watchNowButton/watchNow.component';

interface CardProps {
    id: string;
    backdrop_path: string;
    overview: string;
    title: string;
    vote_average: number;
}

const CardComponent: React.FC<CardProps> = ({ id, backdrop_path, overview, title, vote_average }) => {
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
            {imageUrl && <img src={imageUrl} alt={title} className="card-image" />}
            {hovered && (
                <div className="card-details-panel">
                    <h3 className='title-movie'>{title}</h3>
                    <p>{truncateText(overview, 100)}</p>
                    <div className="rating-and-watch">
                        <WatchNowButtonComponent id={id} imgMedia={backdrop_path} synopsis={overview} mediaTitle={title}
                        rating={vote_average} size='130' height='38' fontweight='1' text='Watch Now' />
                        <StarRating fontSize='16px' rating={vote_average} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default CardComponent;