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
  
  const [streamerData, setStreamerData] = useState<Streamer[]>([]); // Array to hold data of other streamers
  const [imgProfileStreamer, setImgProfileStreamer] = useState<string | undefined>(profile_image_url); // Profile image of the selected streamer
  
  // Environment variables for Twitch API
  const clientId = import.meta.env.VITE_TWITCH_CLIENT_ID; // Client ID from environment variables
  const accessToken = import.meta.env.VITE_TWITCH_ACCESS_TOKEN; // Access token from environment variables

  const usersUrl = "https://api.twitch.tv/helix/users"; // Base URL for user API endpoint

  // Effect to fetch streamer data when component mounts or user_name changes
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page

    const fetchDataStreamer = async () => {
      try {
        // Fetch user data for the specified user_name
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

        const resToJson = await streamsResponse.json(); // Parse response to JSON
        const userData = resToJson.data[0]; // Get user data
        setImgProfileStreamer(userData.profile_image_url); // Update profile image state

        // Fetch game data for the specified game_name
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
        const gameId = gamesResponseToJson.data[0]?.id; // Get game ID

        // Fetch streams related to the game using the game ID
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

        // Filter out the current streamer from the results
        if (matchContentDataToJson.data) {
          const filteredStreamers = matchContentDataToJson.data.filter(
            (streamer: any) => streamer.user_name !== user_name
          );
          setStreamerData(filteredStreamers); // Update state with other streamers
        } else {
          throw new Error(matchContentData.statusText);
        }

        // Prepare to fetch additional user data for the filtered streamers
        const streamers = matchContentDataToJson.data || [];
        const userIds = streamers.map((streamer: any) => streamer.user_id).join('&id='); // Create a list of user IDs for the next request
      
        // Fetch user data for the filtered streamers
        const usersResponse = await fetch(`${usersUrl}?id=${userIds}`, {
          headers: {
            "Client-ID": clientId,
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!usersResponse.ok) throw new Error(`HTTP error! status: ${usersResponse.status}`);

        const usersData = await usersResponse.json();
        const profiles = (usersData.data || []).reduce((acc: any, user: any) => {
          acc[user.id] = user.profile_image_url; // Map user IDs to their profile image URLs
          return acc;
        }, {});

        // Update the streamer data with the profile images
        setStreamerData(streamers.map((streamer: any) => ({
          ...streamer,
          profile_image_url: profiles[streamer.user_id] || '', // Assign profile image if available
        })));
      } catch (err) {
        console.log(err); 
      }
    };

    fetchDataStreamer(); // Call the function to fetch data
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
