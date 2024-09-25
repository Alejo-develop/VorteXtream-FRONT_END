import { useLocation } from "react-router-dom";
import HeaderComponent from "../../../common/components/header/header.component";
import "./style.css";
import { useEffect, useState } from "react";
import { Streamer } from "../../../common/interfaces/streamer.interface";
import CardStreamersLiveComponent from "./components/cardStreamerlive.component";
import CardStreamerComponent from "../../../common/components/cardStreamer/cardStreamer.component";

export default function StreamPage() {
  const location = useLocation();
  const { user_name, game_name, title, viewer_count, profile_image_url } = location.state || {};
  
  const [streamerData, setStreamerData] = useState<Streamer[]>([]);
  const [imgProfileStreamer, setImgProfileStreamer] = useState<string | undefined>(profile_image_url);
  
  const clientId = import.meta.env.VITE_TWITCH_CLIENT_ID
  const accessToken = import.meta.env.VITE_TWITCH_ACCESS_TOKEN;

  const usersUrl = "https://api.twitch.tv/helix/users";

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

        const resToJson = await streamsResponse.json();
        const userData = resToJson.data[0];
        setImgProfileStreamer(userData.profile_image_url); 

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

        const streamers = matchContentDataToJson.data || [];
        const userIds = streamers.map((streamer: any) => streamer.user_id).join('&id=');
      
        const usersResponse = await fetch(`${usersUrl}?id=${userIds}`, {
          headers: {
            "Client-ID": clientId,
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!usersResponse.ok) throw new Error(`HTTP error! status: ${usersResponse.status}`);

        const usersData = await usersResponse.json();
        const profiles = (usersData.data || []).reduce((acc: any, user: any) => {
          acc[user.id] = user.profile_image_url;
          return acc;
        }, {});

        setStreamerData(streamers.map((streamer: any) => ({
          ...streamer,
          profile_image_url: profiles[streamer.user_id] || '',
        })));
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
            src={`https://player.twitch.tv/?channel=${user_name}&parent=vortextreaming.netlify.app`}
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
              key={streamer.id}
              profile_image_url={streamer.profile_image_url || ""}
              id={streamer.id}
              game_name={streamer.game_name}
              title={streamer.title}
              user_name={streamer.user_name}
              type={streamer.type}
              viewer_count={streamer.viewer_count}
              thumbnail_url={streamer.thumbnail_url}
              user_id=""
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
