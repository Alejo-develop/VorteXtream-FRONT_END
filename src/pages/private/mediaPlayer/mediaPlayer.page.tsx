// src/pages/StreamPage.tsx
import { useEffect, useState } from "react";
import VideoPlayer from "../../../common/components/player/player.component";
import "./style.css";
import CardDirectorStudioComponent from "../../../common/components/cardDirectors/cardDirectorStudio.component";
import ContainerCastsOrInfoAnimeComponent from "../../../common/components/containerCats/containerCast.component";
import StarRating from "../../public/searchPage/components/StartRating.component";
import { useLocation } from "react-router-dom";
import SwiperComponent from "../../../common/components/sliderCards.component/swiperComponent/swiperSlider.component";
import CardSmallComponent from "../../../common/components/smallCard/cardContinueWatching.component";
import { CardProps } from "../../../common/interfaces/media.interface";
import HeaderWatchMediaComponent from "./components/headerWatchMedia.component";
import { AnimeApiResponse } from "../../../common/interfaces/animesApi.interface";
import { useAuth } from "../../../auth/auth.provider";

interface Actor {
  id: number;
  name: string;
  profile_path: string | null;
}

interface CrewMember {
  id: number;
  name: string;
  job: string;
}

interface MovieCredits {
  cast: Actor[];
  crew: CrewMember[];
}

export default function StreamPage() {
  const location = useLocation();
  const { id, imgMedia, mediaTitle, synopsis, rating, typeMedia } =
    location.state || {};
  const mediaId: number = id.toString();

  const [data, setData] = useState<MovieCredits | null>(null);
  const [studio, setStudio] = useState<string | undefined>("");
  const [recomendedData, setRecomendedData] = useState<CardProps[]>([]);
  const [media, setMedia] = useState<any[]>([]);
  const [dataAnime, setDataAnime] = useState<AnimeApiResponse | null>(null);

  const auth = useAuth();
  const user = auth.getUser();
  const token = auth.getToken();
  const userId = user.id;

  useEffect(() => {
    window.scrollTo(0, 0);

    const putInHistory = async () => {

      try {
        const res = await fetch(`http://localhost:3000/vortextream/historyuser`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId: userId,
            mediaId: mediaId,
            imgMedia: imgMedia,
            mediaTitle: mediaTitle,
            synopsis: synopsis,
            rating: rating,
            typeMedia: typeMedia ? typeMedia : null 
          })
        });
        
        if(!res.ok) throw new Error(res.statusText)
      } catch (err) {
        console.error(err)
      }
    };

    const fetchData = async () => {
      if (typeMedia === "anime") {
        try {
          const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`);

          if (!res.ok) throw new Error(res.statusText);

          const resToJson = await res.json();
          setDataAnime(resToJson.data);
        } catch (err) {
          console.error(err);
        }
      } else {
        const API_KEY = "a3c97fc58c271f7b5b5cc1c31b8ef888";
        const baseUrl = "https://api.themoviedb.org/3/movie";
        const imageBaseUrl = "https://image.tmdb.org/t/p/w1280";

        try {
          const getMedia = await fetch(
            `${baseUrl}/${id}/videos?api_key=${API_KEY}`
          );

          const mediaToJson = await getMedia.json();
          if (
            Array.isArray(mediaToJson.results) &&
            mediaToJson.results.length > 0
          ) {
            setMedia(mediaToJson.results);
          } else {
            setMedia([]);
          }

          const creditsRes = await fetch(
            `${baseUrl}/${id}/credits?api_key=${API_KEY}`
          );
          const creditsData = await creditsRes.json();

          if (!creditsRes.ok) throw new Error("Data movie not found");

          setData(creditsData);

          const detailsRes = await fetch(`${baseUrl}/${id}?api_key=${API_KEY}`);
          const detailsData = await detailsRes.json();
          if (!detailsRes.ok)
            throw new Error("Error when fetching studio data");

          const studioName = detailsData.production_companies?.[0]?.name;
          setStudio(studioName);

          const firstGenreId = detailsData.genres?.[0].id;

          const fetchRecomendedData = await fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${firstGenreId}`
          );
          const dataRecomendedToJson = await fetchRecomendedData.json();

          const dataRecomended = dataRecomendedToJson.results
            .filter((media: CardProps) => media.backdrop_path && media.overview)
            .map((media: CardProps) => ({
              id: media.id,
              imageUrl: `${imageBaseUrl}${media.backdrop_path}`,
              overview: media.overview,
              title: media.title,
              vote_average: media.vote_average,
            }));
            console.log(dataRecomended);
            
          setRecomendedData(dataRecomended);
        } catch (err) {
          console.log(err);
        }
      }
    };

    putInHistory()
    fetchData();
  }, [location, id]);

  const director = data?.crew?.find((member) => member.job === "Director");
  const actors = data?.cast;

  const trailerKey = media.length > 0 ? media[0].key : null;
  const youtubeSrc = typeMedia !== 'anime'
    ? `https://www.youtube.com/embed/${trailerKey}`
    : dataAnime
    ? `https://www.youtube.com/embed/${dataAnime?.trailer.youtube_id}`
    : null;

  const licensorName = dataAnime?.licensors?.[0]?.name || 'No licensor available';

  return (
    <div  key={location.key} className="container-watchMovie-anime">
      <HeaderWatchMediaComponent />
      <div className="container-movie">
        <VideoPlayer src={youtubeSrc} type="video/mp4" />
      </div>
      <div className={typeMedia !== 'anime' ? "info-movieAnime-container" : 'info-anime-container'}>
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
                <div>
                  <CardDirectorStudioComponent
                    text={studio ? studio : licensorName || "Not update yet"}
                  />
                  <p className="type-card-director-or-studio">Studio</p>
                </div>
                <div>
                  <CardDirectorStudioComponent
                    text={director ? director?.name : dataAnime?.broadcast.timezone || "Not updated yet"}
                  />
                  <p className="type-card-director-or-studio">
                    {director ? "Director" : "Country"}
                  </p>
                </div>
              </div>
              <ContainerCastsOrInfoAnimeComponent broadcast={dataAnime?.broadcast} type={typeMedia === 'anime' ? 'Info' : 'Casts'} actors={actors} />
            </div>
          </div>
          <div className="sinopsis-movie-or-anime">
            <h1 className="titleMovie-watchMedia">{mediaTitle}</h1>
            <p className="sinopsis-medie-watchMedia">{synopsis}</p>
            <StarRating rating={rating} fontSize="4.2rem" />
          </div>
        </div>
        {typeMedia !== 'anime' && (
          <div className="container-matchContent">
            <h2 className="titleContieWatching-watchMedia">Recomended...</h2>
            <div className="container-continue-watiching-watchMedia">
              {recomendedData && recomendedData.length > 0 ? (
                <SwiperComponent
                  className="swiperWatch-media"
                  spaceBetween={1}
                  slidesPerView={3}
                >
                  {recomendedData.map((data) => (
                    <CardSmallComponent
                      key={data.id}
                      id={data.id}
                      imageUrl={data.imageUrl}
                      title={data.title}
                      vote_average={data.vote_average}
                      overview={data.overview}
                      typeMedia={null}
                    />
                  ))}
                </SwiperComponent>
              ) : (
                <div className="div-not-found">
                  <h1 className="title-not-foundTitleMedia">
                    We have not updated this content yet
                  </h1>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
