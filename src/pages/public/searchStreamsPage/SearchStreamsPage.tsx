import React, { useEffect, useState } from "react";
import CardStreamerComponent from "../../../common/components/cardStreamer/cardStreamer.component";
import SearchBarComponent from "./components/searchBar.component";
import "./style.css";
import {
  clientId,
  accessToken,
} from "../../../common/utils/constants/twitchConstants";
import {
  Streamer,
  CategorysStreams,
} from "../../../common/interfaces/streamer.interface";
import SearchMoreButtonComponent from "./components/moreButton.component";
import CardCategorysComponent from "./components/categorys.component";
import SwiperComponent from "../../../common/components/sliderCards.component/swiperComponent/swiperSlider.component";

interface StreamsResponse {
  data: Streamer[];
  pagination: {
    cursor: string;
  };
}

interface CategoriesResponse {
  data: CategorysStreams[];
}

export default function SearchStreamsPage() {
  const [streamersData, setStreamersData] = useState<Streamer[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryData, setCategoryData] = useState<CategorysStreams[]>([]);

  const fetchStreams = async (cursor?: string) => {
    try {
      const url = cursor
        ? `https://api.twitch.tv/helix/streams?first=10&sort=viewer_count&after=${cursor}`
        : searchQuery
        ? `https://api.twitch.tv/helix/streams?first=10&sort=viewer_count&user_login=${searchQuery}`
        : `https://api.twitch.tv/helix/streams?first=10&sort=viewer_count`;

      const streamsResponse = await fetch(url, {
        headers: {
          "Client-ID": clientId,
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!streamsResponse.ok)
        throw new Error("Something went wrong at the server");

      const dataTojson: StreamsResponse = await streamsResponse.json();
      setStreamersData((prevData) =>
        cursor ? [...prevData, ...dataTojson.data] : dataTojson.data
      );

      if (dataTojson.pagination.cursor) {
        setNextCursor(dataTojson.pagination.cursor);
        setHasMore(true);
      } else {
        setNextCursor(null);
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching streams:", error);
    }
  };

  const fetchCategorys = async () => {
    const popularGames = ['Fortnite', 'League of Legends', 'Valorant', 'Minecraft', 'Apex Legends']; // Lista de juegos populares
    const urlCategorys = `https://api.twitch.tv/helix/games?name=${popularGames.join('&name=')}`;

    try {
      const categorysResponse = await fetch(urlCategorys, {
        headers: {
          "Client-ID": clientId,
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!categorysResponse.ok)
        throw new Error("Something went wrong at the server");

      const categoryToJson: CategoriesResponse = await categorysResponse.json();
      console.log(categoryToJson);

      setCategoryData(categoryToJson.data); // Asegúrate de actualizar el estado con el array de categorías
    } catch (err) {
      console.error("Error Fetching categories: ", err);
    }
  };

  useEffect(() => {
    fetchCategorys();
  }, []);

  useEffect(() => {
    fetchStreams();
  }, [searchQuery]);

  const handleLoadMore = () => {
    fetchStreams(nextCursor);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setStreamersData([]); // Limpia los datos cuando se realiza una búsqueda
    setNextCursor(null); // Reinicia el cursor de paginación
  };

  return (
    <div className="container-search-stream">
      <div className="header-container-searchPage">
        <h1 className="search-stream-title">WHAT YOU WANT TO SEE TODAY?</h1>
        <SearchBarComponent onSearchChange={handleSearchChange} />
      </div>

      {!!streamersData.length && (
        <div className="rooms-container-searchStreams">
          {streamersData.map((streamer) => (
            <CardStreamerComponent
              key={streamer.id}
              profile_image_url={streamer.profile_image_url || ""} // Asegúrate de pasar todos los props requeridos
              id={streamer.id}
              game_name={streamer.game_name}
              title={streamer.title}
              user_name={streamer.user_name}
              type={streamer.type}
              viewer_count={streamer.viewer_count}
              thumbnail_url={streamer.thumbnail_url}
            />
          ))}
        </div>
      )}

      {hasMore && <SearchMoreButtonComponent onClick={handleLoadMore} />}

      <div className="category-streams-container">
        <h1 className="title-section-category">Game Categories</h1>

        {!!categoryData.length && ( // Verifica que `categoryData` no esté vacío
          <SwiperComponent spaceBetween={1} slidesPerView={3}>
            {categoryData.map((category) => (
              <CardCategorysComponent id={category.id} name={category.name} box_art_url={category.box_art_url}  />
            ))}
          </SwiperComponent>
        )}
      </div>
    </div>
  );
}
