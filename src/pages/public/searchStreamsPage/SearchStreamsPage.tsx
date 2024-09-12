import CardStreamerComponent from "../../../common/components/cardStreamer/cardStreamer.component";
import SearchBarComponent from "./components/searchBar.component";
import "./style.css";
import {
  clientId,
  accessToken,
} from "../../../common/utils/constants/twitchConstants";
import { useEffect, useState } from "react";
import { Streamer } from "../../../common/interfaces/streamer.interface";
import SearchMoreButtonComponent from "./components/moreButton.component";

interface StreamsResponse {
  data: Streamer[];
  pagination: {
    cursor: string;
  };
}

export default function SearchStreamsPage() {
  const [streamersData, setStreamersData] = useState<Streamer[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // Estado para almacenar el texto de búsqueda

  const fetchStreams = async (cursor?: string) => {
    setIsLoading(true);
    try {
      // Construir la URL de acuerdo al estado de búsqueda y paginación
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

      if (!streamsResponse.ok) throw new Error("Something went wrong at the server");

      const dataTojson: StreamsResponse = await streamsResponse.json();
      // Actualizar los datos dependiendo del estado de búsqueda
      setStreamersData(prevData => cursor ? [...prevData, ...dataTojson.data] : dataTojson.data);

      // Manejar el cursor para la paginación
      if (dataTojson.pagination.cursor) {
        setNextCursor(dataTojson.pagination.cursor);
        setHasMore(true);
      } else {
        setNextCursor(null);
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching streams:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStreams(); // Fetch initial data
  }, [searchQuery]); // Refetch data when search query changes

  const handleLoadMore = () => {
    if (hasMore && !isLoading) {
      fetchStreams(nextCursor);
    }
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
              profile_image_url=""
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
    </div>
  );
}
