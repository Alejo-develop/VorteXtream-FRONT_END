import { useLocation } from "react-router-dom";
import HeaderComponent from "../../../common/components/header/header.component";
import "./style.css";
import { useEffect, useState } from "react";
import { Streamer } from "../../../common/interfaces/streamer.interface";
import CardStreamersLiveComponent from "./components/cardStreamerlive.component";

export default function StreamPage() {
  const location = useLocation();
  const { user_name, game_name, title, viewer_count } = location.state || {};
  console.log("username", user_name);

  const [streamerData, setStreamerData] = useState<Streamer[]>([]);
  const [imgPorfileStreamer, setImgPorfileStreamer] = useState<string>();

  const clientId = "okkzkyh8ogfm1kt5aukaaxow9owi2w";
  const accessToken = "cwo0te7eacxhmu608bi92yzz73lt6r";

  useEffect(() => {
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

        const resToJson = (await streamsResponse.json())
        const userData = resToJson.data[0];
        setImgPorfileStreamer(userData.profile_image_url);
        console.log(resToJson);
        console.log("Profile Image URL:", resToJson.profile_image_url);
      } catch (err) {
        console.log(err);
      }
    };

    fetchDataStreamer();
  }, []);

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
            <CardStreamersLiveComponent user_name={user_name} title={title} game_name={game_name} viewer_count={viewer_count} profile_image_url={imgPorfileStreamer || 'Not update yet'} />
          </div>
          <div className="match-content-WatchStream"></div>
        </div>
      </div>
    </div>
  );
}


//user_name={user_name} title={title} game_name={game_name} viewer_count={viewer_count}