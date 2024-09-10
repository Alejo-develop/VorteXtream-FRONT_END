import "./style.css";

interface CardLargeProps{
    index: number;
    img: string;
    title: string;
    overview : string;
}

const CardLargeComponent = ({ index, img, title, overview }: CardLargeProps) => {
  return (
    <div key={index} className="container-card-large">
      <div className="banner-cardLarge-container">
        <img className="img-banner-cardLarge" src={img} alt="banner-image-cardLarge" />
      </div>

      <div className="info-media-container">
        <h2 className="media-title-cardLarge">{title}</h2>
      
        <p className="sinopsis-cardLarge">{overview}</p>
      </div>
    </div>
  );
};

export default CardLargeComponent;
