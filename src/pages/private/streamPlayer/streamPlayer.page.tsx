import { useLocation } from "react-router-dom";
import HeaderComponent from "../../../common/components/header/header.component";
import "./style.css";
import { useEffect, useState } from "react";
import { Streamer } from "../../../common/interfaces/streamer.interface";
import CardStreamersLiveComponent from "./components/cardStreamerlive.component";
import CardStreamerComponent from "../../../common/components/cardStreamer/cardStreamer.component";
import { useAuth } from "../../../auth/auth.provider";

export default function StreamPage() {
  const location = useLocation();
  const { user_name, game_name, title, viewer_count, profile_image_url } = location.state || {};
  
  const [streamerData, setStreamerData] = useState<Streamer[]>([]);
  const [imgProfileStreamer, setImgProfileStreamer] = useState<string | undefined>(profile_image_url);
  
  const clientId = "okkzkyh8ogfm1kt5aukaaxow9owi2w";
  const accessToken = "cwo0te7eacxhmu608bi92yzz73lt6r";
  const auth = useAuth()

  useEffect(() => {
    // Desplazar hacia arriba al cargar nuevos datos
    window.scrollTo(0, 0);
 
    const fetchDataStreamer = async () => {
      try {
        const streamsResponse = await fetch(
          `https://api.twitch.tv/helix/users?login=${user_name}`,
          {
            headers: {
              "Client-ID": clientId,
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!streamsResponse.ok) throw new Error(streamsResponse.statusText);

        const resToJson = await streamsResponse.json();
        const userData = resToJson.data[0];
        setImgProfileStreamer(userData.profile_image_url); // Actualiza la imagen de perfil aquí

        const gamesResponse = await fetch(
          `https://api.twitch.tv/helix/games?name=${game_name}`,
          {
            headers: {
              "Client-ID": clientId,
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!gamesResponse.ok) throw new Error(gamesResponse.statusText);

        const gamesResponseToJson = await gamesResponse.json();
        const gameId = gamesResponseToJson.data[0]?.id;

        const matchContentData = await fetch(
          `https://api.twitch.tv/helix/streams?game_id=${gameId}&first=5`,
          {
            headers: {
              "Client-ID": clientId,
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!matchContentData.ok) throw new Error(matchContentData.statusText);

        const matchContentDataToJson = await matchContentData.json();

        if (matchContentDataToJson.data) {
          const filteredStreamers = matchContentDataToJson.data.filter(
            (streamer: any) => streamer.user_name !== user_name
          );
          setStreamerData(filteredStreamers);
        } else {
          throw new Error(matchContentData.statusText);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchDataStreamer();
  }, [user_name]);

  return (
    <div className="container-streamerViewer-page">
      <HeaderComponent />
      <div className="stream-container">
        <div className="container-streamer-live">
          <iframe
            className="iframe-streamTwitch"
            src={`https://player.twitch.tv/?channel=${user_name}&parent=localhost`}
            allowFullScreen
          ></iframe>
        </div>
        <div className="contianer-info-streamer-live">
          <div className="container-card-streamer">
            <CardStreamersLiveComponent
              user_name={user_name}
              title={title}
              game_name={game_name}
              viewer_count={viewer_count}
              profile_image_url={imgProfileStreamer || "Not updated yet"}
            />
          </div>
          <h2 className="similar-content-title">Similar Content</h2>
          <div className="match-content-WatchStream">
            {streamerData.map((streamer) => (
              <CardStreamerComponent
                key={streamer.id} // Añade una key única
                thumbnail_url={streamer.thumbnail_url}
                title={streamer.title}
                game_name={streamer.game_name}
                viewer_count={streamer.viewer_count}
                id={streamer.id}
                user_name={streamer.user_name}
                profile_image_url={streamer.profile_image_url}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
