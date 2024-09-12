import CardStreamerComponent from "../../../common/components/cardStreamer/cardStreamer.component";
import SearchBarComponent from "./components/searchBar.component";
import "./style.css";
import {
  clientId,
  accessToken,
  streamsUrl,
  usersUrl,
} from "../../../common/utils/constants/twitchConstants";
import { useEffect, useState } from "react";
import { Streamer } from "../../../common/interfaces/streamer.interface";

interface StreamsResponse {
  data: Streamer[];
}

export default function SearchStreamsPage() {
  const [streamersData, setStreamersData] = useState<Streamer[]>([]);

  const createUrlWithFirst = (baseUrl: string, newFirst: any) => {
    const url = new URL(baseUrl);
    url.searchParams.set("first", newFirst);
    return url.toString();
  };

  useEffect(() => {
    const fetchStreams = async () => {
      const updatedStreamsUrl = createUrlWithFirst(streamsUrl, 10);

      const streamsResponse = await fetch(updatedStreamsUrl, {
        headers: {
          "Client-ID": clientId,
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!streamsResponse.ok)
        throw new Error("Somthing went wrong at the server");

      const dataTojson: StreamsResponse = await streamsResponse.json();
      setStreamersData(dataTojson.data);
    };

    fetchStreams();
  }, []);

  return (
    <div className="container-search-stream">
      <div className="header-container-searchPage">
        <h1 className="search-stream-title">WHAT YOU WANT TO SEE TODAY?</h1>
        <SearchBarComponent />
      </div>

      {!!streamersData && (
        <div className="rooms-container-searchStreams">
          {streamersData.map((streamer) => (
            <CardStreamerComponent
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
    </div>
  );
}
