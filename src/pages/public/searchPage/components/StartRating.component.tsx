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
            {Array(fullStars).fill(<FontAwesomeIcon icon={faStar} style={{ color: 'F08080'}} />)}
            {halfStar && <FontAwesomeIcon icon={faStarHalfAlt} style={{ color: 'F08080' }} />}
            {Array(emptyStars).fill(<FontAwesomeIcon icon={faStar} style={{ color: 'F08080' }} />)}
        </div>
    );
};

export default StarRating;
