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

// Define interfaces for Actor, CrewMember, and MovieCredits to structure our data
interface Actor {
  id: number;
  name: string;
  profile_path: string | null; // Profile picture path can be null
}

interface CrewMember {
  id: number;
  name: string;
  job: string; // Job title (e.g., Director)
}

interface MovieCredits {
  cast: Actor[]; // List of actors
  crew: CrewMember[]; // List of crew members
}

// Main StreamPage component
export default function StreamPage() {
  // Get location data from React Router
  const location = useLocation();
  const { id, imgMedia, mediaTitle, synopsis, rating, typeMedia } =
    location.state || {};
  const mediaId: number = id.toString(); // Convert ID to strin

  // State variables for managing component data
  const [data, setData] = useState<MovieCredits | null>(null); // Movie credits data
  const [studio, setStudio] = useState<string | undefined>(""); // Studio name
  const [recomendedData, setRecomendedData] = useState<CardProps[]>([]); // Recommended movies
  const [media, setMedia] = useState<any[]>([]); // Video media data
  const [dataAnime, setDataAnime] = useState<AnimeApiResponse | null>(null); // Anime data

  // Authentication context to get user data
  const auth = useAuth();
  const user = auth.getUser();
  const token = auth.getToken();
  const userId = user.id;

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on page load

    const putInHistory = async () => {
      try {
        // Send user's media history to the backend
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/historyuser`,
          {
            method: "POST",
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
              typeMedia: typeMedia ? typeMedia : null,
            }),
          }
        );

        if (!res.ok) throw new Error(res.statusText); // Handle fetch errors
      } catch (err) {
        console.error(err);
      }
    };

    const fetchData = async () => {
      if (typeMedia === "anime") {
         // Fetch anime data if the media type is anime
        try {
          const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`);

          if (!res.ok) throw new Error(res.statusText);

          const resToJson = await res.json();
          setDataAnime(resToJson.data);  // Store anime data in state
        } catch (err) {
          console.error(err);
        }
      } else {
         // Fetch movie data if the media type is not anime
        const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
        const baseUrl = "https://api.themoviedb.org/3/movie";
        const imageBaseUrl = "https://image.tmdb.org/t/p/w1280";

        try {
           // Fetch video media data
          const getMedia = await fetch(
            `${baseUrl}/${id}/videos?api_key=${API_KEY}`
          );

          const mediaToJson = await getMedia.json();
          if (
            Array.isArray(mediaToJson.results) &&
            mediaToJson.results.length > 0
          ) {
            setMedia(mediaToJson.results); // Store media data
          } else {
            setMedia([]); // No media found
          }

          // Fetch movie credits
          const creditsRes = await fetch(
            `${baseUrl}/${id}/credits?api_key=${API_KEY}`
          );
          const creditsData = await creditsRes.json();

          if (!creditsRes.ok) throw new Error("Data movie not found");

          setData(creditsData); // Store credits data

           // Fetch movie details to get the studio name
          const detailsRes = await fetch(`${baseUrl}/${id}?api_key=${API_KEY}`);
          const detailsData = await detailsRes.json();
          if (!detailsRes.ok)
            throw new Error("Error when fetching studio data");

          const studioName = detailsData.production_companies?.[0]?.name;
          setStudio(studioName);  // Store studio name

          // Fetch recommended movies based on the first genre ID
          const firstGenreId = detailsData.genres?.[0].id;
          const fetchRecomendedData = await fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${firstGenreId}`
          );
          const dataRecomendedToJson = await fetchRecomendedData.json();

           // Filter and map recommended data to a desired format
          const dataRecomended = dataRecomendedToJson.results
            .filter((media: CardProps) => media.backdrop_path && media.overview)
            .map((media: CardProps) => ({
              id: media.id,
              imageUrl: `${imageBaseUrl}${media.backdrop_path}`,
              overview: media.overview,
              title: media.title,
              vote_average: media.vote_average,
            }));

          setRecomendedData(dataRecomended); // Store recommended data
        } catch (err) {
          console.log(err);
        }
      }
    };

     // Call functions to update history and fetch data
    putInHistory();
    fetchData();
  }, [location, id]); // Dependency array to re-run effect when location or id changes

  // Extract director and actors from credits data
  const director = data?.crew?.find((member) => member.job === "Director");
  const actors = data?.cast;

  // Determine the trailer key and YouTube source for the video player
  const trailerKey = media.length > 0 ? media[0].key : null;
  const youtubeSrc =
    typeMedia !== "anime"
      ? `https://www.youtube.com/embed/${trailerKey}`
      : dataAnime
      ? `https://www.youtube.com/embed/${dataAnime?.trailer.youtube_id}`
      : null;

  // Get the licensor name for anime or set a default message
  const licensorName = dataAnime?.licensors?.[0]?.name || "No licensor available";

  return (
    <div key={location.key} className="container-watchMovie-anime">
      <HeaderWatchMediaComponent />
      <div className="container-movie">
        <VideoPlayer src={youtubeSrc} type="video/mp4" />
      </div>
      <div
        className={
          typeMedia !== "anime"
            ? "info-movieAnime-container"
            : "info-anime-container"
        }
      >
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
                    text={
                      director
                        ? director?.name
                        : dataAnime?.broadcast.timezone || "Not updated yet"
                    }
                  />
                  <p className="type-card-director-or-studio">
                    {director ? "Director" : "Country"}
                  </p>
                </div>
              </div>
              <ContainerCastsOrInfoAnimeComponent
                broadcast={dataAnime?.broadcast}
                type={typeMedia === "anime" ? "Info" : "Casts"}
                actors={actors}
              />
            </div>
          </div>
          <div className="sinopsis-movie-or-anime">
            <h1 className="titleMovie-watchMedia">{mediaTitle}</h1>
            <p className="sinopsis-medie-watchMedia">{synopsis}</p>
            <StarRating rating={rating} fontSize="4.2rem" />
          </div>
        </div>
        {typeMedia !== "anime" && (
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
