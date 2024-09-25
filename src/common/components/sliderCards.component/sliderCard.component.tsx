import React, { useState } from 'react';
import './CardComponent.css';
import StarRating from '../../../pages/public/searchPage/components/StartRating.component';
import WatchNowButtonComponent from '../watchNowButton/watchNow.component';
import AddFavoritesButtonComponent from '../addFavoritesButton/addFavoritesButton.component';

interface CardProps {
    id: string;
    backdrop_path: string;
    overview: string;
    title: string;
    vote_average: number;
    typeMedia?: string;
}

const CardComponent: React.FC<CardProps> = ({ typeMedia ,id, backdrop_path, overview, title, vote_average }) => {
    const [hovered, setHovered] = useState(false);
    const imageUrl = typeMedia  ?  `https://image.tmdb.org/t/p/w1280${backdrop_path}` :  backdrop_path;

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
                    <div className='starts-content'>
                     <StarRating fontSize='16px' rating={vote_average} />
                    </div>
                  

                    <div className="rating-and-watch">
                        <div className='buttons-card-search-page'>
                            <WatchNowButtonComponent id={id} imgMedia={backdrop_path} synopsis={overview} mediaTitle={title}
                                rating={vote_average} size='140' height='38' fontweight='0.8' text='Watch Now' />
                            <AddFavoritesButtonComponent mediaId={id} title={title} backdrop_path={backdrop_path} overview={overview} vote_average={vote_average} size="120" fontweight="0.8" height="38" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CardComponent;