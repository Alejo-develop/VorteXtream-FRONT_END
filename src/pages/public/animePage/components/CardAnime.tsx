import React from 'react';
import '../styles/cardanime.css'; // Asegúrate de que el archivo de estilos esté correctamente importado
import WatchNowButtonComponent from '../../../../common/components/watchNowButton/watchNow.component';
import AddFavoritesButtonComponent from '../../../../common/components/addFavoritesButton/addFavoritesButton.component';

export interface CardAnimeProps {
    id: number;
    title_japonese: string;
    title_english: string;
    image_url: string;
    synopsis: string;
}

export const CardAnime: React.FC<CardAnimeProps> = ({ id, title_japonese, title_english, image_url, synopsis }) => {
    return (
        <div className="card-anime">
            <img src={image_url} alt={title_japonese} className="img-anime" />
            <div className="details-anime">
                <h2 className="title-japonese">{title_japonese}</h2>
                <h3 className="title-english">{title_english}</h3>
                <p className="synopsis-anime">{synopsis}</p>
            </div>
            <div className="buttons">
                <WatchNowButtonComponent size={'3px'} height={'3px'} fontweight={'1'} text={'Watch Now'} />
                <AddFavoritesButtonComponent size={'3px'} height={'3px'} fontweight={'1r'} />
            </div>
           
        </div>
    );
}

export default CardAnime;
