import StarRating from "../../../pages/public/searchPage/components/StartRating.component";
import WatchNowButtonComponent from "../watchNowButton/watchNow.component";
import "./style.css";

interface SmallCardProps {
  id: string;
  imageUrl: string;
  title: string;
  vote_average: number;
  overview: string;
}

const CardSmallComponent = ({
  id,
  imageUrl,
  title,
  vote_average,
  overview
}: SmallCardProps) => {
  return (
    <div key={id} className="container-small-card">
      <div className="container-img-card-small">
        <img src={imageUrl} alt="smallCard-img" className="img-small-card" />
      </div>
      <div className="info-container-samll-card">
        <h2 className="title-card-small">{title}</h2>
        <div className="containetr-buttons-card-small">
          <WatchNowButtonComponent
           id={id}
           imgMedia={imageUrl}
           mediaTitle={title}
           rating={vote_average}
           synopsis={overview}
           text="Continue Watching"
           size="170"
           height="45"
           fontweight="0.8"
           type="button"
          />
          <StarRating rating={vote_average} fontSize="1.4rem"/>
        </div>
      </div>
    </div>
  );
};

export default CardSmallComponent;
