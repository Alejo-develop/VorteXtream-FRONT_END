import { useEffect, useState } from "react";
import HeaderComponent from "../../../common/components/header/header.component";
import MostWatchedMediaComponent from "./components/mostWatched.component";
import MostWatchedStreamComponent from "./components/mostWatchedStream.component";
import "./styles/index.css";
import CardGenreComponent from "../searchPage/components/Cards.component";
import { CardProps } from "../../../common/interfaces/media.interface";
import CardLargeComponent from "../../../common/components/cardaLargeMedia/cardLarge.component";
import image from '../../../assets/img/WhatsApp Image 2024-09-10 at 11.29.06 AM.jpeg'


export default function LandingPage() {
  const [data, setData] = useState<CardProps[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    const fetchData = async () => {
      const API_KEY = "a3c97fc58c271f7b5b5cc1c31b8ef888";
      const baseUrl = "https://api.themoviedb.org/3/movie/popular?api_key=";
      const imageBaseUrl = "https://image.tmdb.org/t/p/w1280";

      try {
        const res = await fetch(`${baseUrl}${API_KEY}&language=en-US&page=3`);

        if (!res.ok) {
          const resErrorMessage = res.json();
          setErrorMessage("An error occurred");

          throw new Error("An error occurred");
        }

        const resToJson = await res.json();

        const data = resToJson.results
          .filter((media: CardProps) => media.backdrop_path && media.overview)
          .map((media: CardProps) => ({
            imageUrl: `${imageBaseUrl}${media.backdrop_path}`,
            overview: media.overview,
            title: media.title,
            vote_average: media.vote_average,
          }));

        setData(data);
      } catch (err: any) {
        setErrorMessage(err.message || "An error occurred");
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container-landingPage">
      <HeaderComponent />

      <div className="mostWatched-media">
        <MostWatchedMediaComponent />

        <MostWatchedStreamComponent />
      </div>

      <div className="mostWatched-country">
        <h1 className="mostWatched-country-title">Most Watched In ....</h1>
        {/* <CardGenreComponent />  */}
      </div>

      <div className="container-recently-adde">
        <h1 className="recently-added-title">
          Recently added
        </h1>
          <div>
            <CardLargeComponent img={image} index={1} title="Shrek 2: Burro se come la leona" overview="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis veniam similique accusamus saepe itaque excepturi ad quisquam laborum exercitationem, aliquam, pariatur, tempore voluptatibus. Molestiae, quas autem labore saepe similique quaerat." />
          </div>
        
      </div>
    </div>
  );
}

{/* <div className="recently add cards">
          {data.length > 0 &&(
            data.map((media, index) => (

            ))
          )}
        </div> */}
