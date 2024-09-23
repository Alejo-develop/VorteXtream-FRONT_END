import { useEffect, useState } from "react";
import HeaderComponent from "../../../common/components/header/header.component";
import MostWatchedMediaComponent from "./components/mostWatched.component";
import MostWatchedStreamComponent from "./components/mostWatchedStream.component";
import "./styles/index.css";
import {
  CardProps,
  HistoryResponse,
} from "../../../common/interfaces/media.interface";
import CardLargeComponent from "../../../common/components/cardaLargeMedia/cardLarge.component";
import MotionTransition from "../../../common/components/transition/transition.component";
import { useAuth } from "../../../auth/auth.provider";
import SwiperComponent from "../../../common/components/sliderCards.component/swiperComponent/swiperSlider.component";
import CardComponent from "../../../common/components/sliderCards.component/sliderCard.component";
import CardSmallComponent from "../../../common/components/smallCard/cardContinueWatching.component";

export default function LandingPage() {
  const [dataMediaCountry, setDataMediaCountry] = useState<CardProps[]>([]);
  const [mediaRecent, setMediaRecentlyAdd] = useState<CardProps[]>([]);
  const [historyUser, setHistoryUser] = useState<HistoryResponse[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | undefined | any>(
    undefined
  );

  const auth = useAuth();
  const token = auth.getToken();
  const user = auth.getUser();
  const prefixCountry = user?.prefixCountry || "CO";

  const country = auth.getUser()?.country || "United States";

  useEffect(() => {
    const fetchData = async () => {
      const API_KEY = "a3c97fc58c271f7b5b5cc1c31b8ef888";
      const baseUrl = "https://api.themoviedb.org/3/movie/popular?api_key=";  //https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=es-ES&region=${countryCode}

      const imageBaseUrl = "https://image.tmdb.org/t/p/w1280";

      try {
        const res = await fetch(
          `${baseUrl}${API_KEY}&language=es-ES&region=${prefixCountry}&sort_by=popularity.desc`
        );

        if (!res.ok) {
          const resErrorMessage = res.json();
          setErrorMessage(resErrorMessage);

          throw new Error(errorMessage);
        }

        const resToJson = await res.json();

        const data = resToJson.results
          .filter((media: CardProps) => media.backdrop_path && media.overview)
          .map((media: CardProps) => ({
            id: media.id,
            imageUrl: `${imageBaseUrl}${media.backdrop_path}`,
            overview: media.overview,
            title: media.title,
            vote_average: media.vote_average,
          }));

        setDataMediaCountry(data);

        const fetchHistory = await fetch(
          "http://localhost:3000/vortextream/historyuser",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!fetchHistory.ok) {
          const errorMessage = await fetchHistory.json();
          setErrorMessage(errorMessage);
          throw new Error(errorMessage);
        }

        const historyToJson = await fetchHistory.json();

        setHistoryUser(historyToJson);
      } catch (err: any) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [user]);

  useEffect(() => {
    const fetchDataAddRecently = async () => {
      const API_KEY = "a3c97fc58c271f7b5b5cc1c31b8ef888";
      const baseUrl = "https://api.themoviedb.org/3/movie/now_playing?api_key=";  
      const imageBaseUrl = "https://image.tmdb.org/t/p/w1280";

      try {
        const res = await fetch(`${baseUrl}${API_KEY}&language=en-US&page=4`);

        if (!res.ok) {
          const resErrorMessage = res.json();
          setErrorMessage(resErrorMessage);

          throw new Error(errorMessage);
        }

        const resToJson = await res.json();

        const data = resToJson.results
          .filter((media: CardProps) => media.backdrop_path && media.overview)
          .map((media: CardProps) => ({
            imageUrl: `${imageBaseUrl}${media.backdrop_path}`,
            overview: media.overview,
            title: media.title,
            vote_average: media.vote_average,
            id: media.id,
          }));

        setMediaRecentlyAdd(data);
      } catch (err: any) {
        console.error("Error fetching data:", err);
      }
    };

    fetchDataAddRecently();
  }, []);

  return (
    <div className="container-landingPage">
      <HeaderComponent />

      <div className="mostWatched-media">
        <MotionTransition position="left" className="transition-css">
          <MostWatchedMediaComponent />
        </MotionTransition>

        <MotionTransition position="right" className="">
          <MostWatchedStreamComponent />
        </MotionTransition>
      </div>

      <div className="mostWatched-country">
        <h1 className="mostWatched-country-title">
          Most Watched in {country}{" "}
        </h1>
        <SwiperComponent
          className="mySwiper-most-watched"
          spaceBetween={5}
          slidesPerView={5}
        >
          {dataMediaCountry.map((movie) => (
            <CardComponent
              key={movie.id}
              id={movie.id}
              backdrop_path={movie.imageUrl}
              overview={movie.overview}
              title={movie.title}
              vote_average={movie.vote_average}
            />
          ))}
        </SwiperComponent>
      </div>

      {!!auth.isAuthenticated && historyUser.length > 0 &&(
        <div className="container-continueWatching">
          <h1 className="continue-watiching-title">Continue Watching...</h1>

          <SwiperComponent
            className="mySwiper-most-watched"
            spaceBetween={1}
            slidesPerView={3}
          >
            {historyUser.map((movie) => (
              <CardSmallComponent
                key={movie.mediaId}
                id={movie.mediaId}
                imageUrl={movie.imgMedia}
                title={movie.mediaTitle}
                vote_average={movie.rating}
                overview={movie.synopsis}
                typeMedia={movie.typeMedia || ""}
              />
            ))}
          </SwiperComponent>
        </div>
      )}

      <div className="container-recently-adde">
        <h1 className="recently-added-title">Recently added</h1>
        <div>
          {mediaRecent.map((movie) => (
            <CardLargeComponent
              img={movie.imageUrl}
              index={movie.id}
              title={movie.title}
              overview={movie.overview}
              rating={movie.vote_average}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
