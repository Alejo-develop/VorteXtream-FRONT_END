import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';


type StarRatingProps = {
    rating: number;
    fontSize: string;
};

const StarRating: React.FC<StarRatingProps> = ({ rating,  fontSize }) => {
    const fullStars = Math.floor(rating / 2);  // Convertimos la puntuación de /10 a /5
    const halfStar = rating % 2 >= 1 ? true : false;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
        <div style={{marginTop:'6px', fontSize}}>
            {Array(fullStars).fill(<FontAwesomeIcon icon={faStar} style={{ color: 'gold' }} />)}
            {halfStar && <FontAwesomeIcon icon={faStarHalfAlt} style={{ color: 'gold' }} />}
            {Array(emptyStars).fill(<FontAwesomeIcon icon={faStar} style={{ color: 'gray' }} />)}
        </div>
    );
};

export default StarRating;
