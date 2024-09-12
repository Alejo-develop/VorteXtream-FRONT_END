import { useEffect, useState } from "react";
import StreamMostViewComponent from "../../pages/public/searchStreamsPage/components/streamMosViewDiv.component";
import "./style.css";

interface NavbarProps {
  children: React.ReactNode;
}

interface Streamer {
  id: string;
  game_name: string;
  title: string;
  type: string;
  user_name: string;
  viewer_count: number;
  profile_image_url: string; // Cambiado a profile_image_url
}

const LayoutStreamers = ({ children }: NavbarProps) => {
  const [streamersData, setStreamersData] = useState<Streamer[]>([]);

  const clientId = "okkzkyh8ogfm1kt5aukaaxow9owi2w";
  const accessToken = "cwo0te7eacxhmu608bi92yzz73lt6r";
  const streamsUrl = "https://api.twitch.tv/helix/streams?first=5&sort=viewer_count";
  const usersUrl = "https://api.twitch.tv/helix/users";

  useEffect(() => {
    const fetchStreamersData = async () => {
      // Obtener datos de streams
      const streamsResponse = await fetch(streamsUrl, {
        headers: {
          "Client-ID": clientId,
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!streamsResponse.ok) throw new Error(`HTTP error! status: ${streamsResponse.status}`);

      const streamsData = await streamsResponse.json();
      const streamers = streamsData.data || [];

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

      // Actualizar los datos de los streamers con la URL de perfil
      setStreamersData(streamers.map((streamer: any) => ({
        ...streamer,
        profile_image_url: profiles[streamer.user_id] || '',
      })));
      console.log(streamsData, usersData);
    };

    fetchStreamersData();
  }, []);

  return (
    <div>
      <aside className="sidebar-streams">
        {!!streamersData && (
          <div>
            {streamersData.map((streamer) => (
              <StreamMostViewComponent
                thumbnail_url={streamer.profile_image_url} // Usar profile_image_url en lugar de thumbnail_url
                id={streamer.id}
                user_name={streamer.user_name}
                viewer_count={streamer.viewer_count}
                type={streamer.type}
                game_name={streamer.game_name}
              />
            ))}
          </div>
        )}
      </aside>

      {children}
    </div>
  );
};

export default LayoutStreamers;
