import { useEffect } from "react";
import VideoPlayer from "../../../common/components/player/player.component";
import "./style.css";
import logo from "../../../assets/img/WhatsApp Image 2024-09-10 at 11.29.06 AM.jpeg";
import CardDirectorStudioComponent from "../../../common/components/cardDirectors/cardDirectorStudio.component";
import ContainerCastsComponent from "../../../common/components/containerCats/containerCast.component";
import StarRating from "../../public/searchPage/components/StartRating.component";
import CardSmallComponent from "../../../common/components/smallCard/cardContinueWatching.component";
import SwiperComponent from "../../../common/components/sliderCards.component/swiperComponent/swiperSlider.component";
import { useLocation } from "react-router-dom";

export default function StreamPage() {
  const location = useLocation();
  const { id, media, imgMedia, mediaTitle, synopsis, rating } = location.state || {};
  
  useEffect(() => {
      // Desplazar automáticamente al inicio de la vista
      window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
      console.log("Location state:", location.state);
      window.scrollTo(0, 0);
    }, [location.state]);
  return (
    <div className="container-watchMovie-anime">
      <div className="container-movie">
        <VideoPlayer
          src="https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4"
          type="video/mp4"
        />
      </div>

      <div className="info-movieAnime-container">
        <div className="container-infoDataMovie-sinopsis">
          <div className="dataMovie-or-anime">
            <div className="banner-img-watchMedia">
              <img
                src={imgMedia}
                alt="banner-img-watchMedia"
                className="img-watchMedia-info"
              />
            </div>
            <div className="info-dataMovieorAnime">
              <div className="container-director-studio-cards">
                <CardDirectorStudioComponent text="Dreamworks" />
                <CardDirectorStudioComponent text="Andrew Adamson" />
              </div>

              <ContainerCastsComponent />
            </div>
          </div>
          <div className="sinopsis-movie-or-anime">
            <h1 className="titleMovie-watchMedia">
              {mediaTitle}
            </h1>
            <p className="sinopsis-medie-watchMedia">
             {synopsis}
            </p>

            <div>
              <StarRating rating={2} fontSize="4.2rem" />
            </div>
          </div>
        </div>

        <div className="container-matchContent">
          <h2 className="titleContieWatching-watchMedia">
            Continue Watching...
          </h2>

          <div className="container-continue-watiching-watchMedia">
            <CardSmallComponent
              id={"i"}
              imageUrl={logo}
              title={"Shrek"}
              vote_average={10}
              overview="hola"
            />
            <CardSmallComponent
              id={"1"}
              imageUrl={logo}
              title={"Shrek"}
              vote_average={10}
              overview="hola"
            />

            <CardSmallComponent
              id={"1"}
              imageUrl={logo}
              title={"Shrek"}
              vote_average={10}
              overview="hola"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
