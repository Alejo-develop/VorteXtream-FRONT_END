import AddFavoritesButtonComponent from "../addFavoritesButton/addFavoritesButton.component";
import WatchNowButtonComponent from "../watchNowButton/watchNow.component";
import "./style.css";

interface CardLargeProps{
    index: number;
    img: string;
    title: string;
    overview : string;
}

const CardLargeComponent = ({ index, img, title, overview }: CardLargeProps) => {

  const truncateText = (text: string, maxLength: number) => {
      return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  return (
    <div key={index} className="container-card-large">
      <div className="banner-cardLarge-container">
        <img className="img-banner-cardLarge" src={img} alt="banner-image-cardLarge" />
      </div>

      <div className="info-media-container">
        <h1 className="media-title-cardLarge">{title}</h1>
      
        <p className="sinopsis-cardLarge">{truncateText(overview, 500)}</p>

        <div className="container-buttons-addREcently">
          <WatchNowButtonComponent size="190" text="Watch Now" fontweight="1" height="45"/>
          <AddFavoritesButtonComponent size="190" fontweight="1" height="45" />
        </div>
      </div>
    </div>
  );
};

export default CardLargeComponent;
