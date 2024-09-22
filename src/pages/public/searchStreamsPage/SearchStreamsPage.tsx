import React, { useEffect, useState } from "react";
import CardStreamerComponent from "../../../common/components/cardStreamer/cardStreamer.component";
import "./style.css";
import { clientId, accessToken } from "../../../common/utils/constants/twitchConstants";
import { Streamer, CategorysStreams } from "../../../common/interfaces/streamer.interface";
import SearchMoreButtonComponent from "./components/moreButton.component";
import CardCategorysComponent from "./components/categorys.component";
import SwiperComponent from "../../../common/components/sliderCards.component/swiperComponent/swiperSlider.component";
import HeaderSearchStreamComponent from "./components/headerSearchStream.component";

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
  const [nextCursor, setNextCursor] = useState<string | undefined>(undefined);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryData, setCategoryData] = useState<CategorysStreams[]>([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);

  const fetchStreams = async (cursor?: string) => {
    try {
      const url = cursor
        ? `https://api.twitch.tv/helix/streams?first=10&sort=viewer_count&after=${cursor}&game_id=${selectedCategoryIds.join('&game_id=')}`
        : searchQuery
        ? `https://api.twitch.tv/helix/streams?first=10&sort=viewer_count&user_login=${searchQuery}&game_id=${selectedCategoryIds.join('&game_id=')}`
        : `https://api.twitch.tv/helix/streams?first=10&sort=viewer_count&game_id=${selectedCategoryIds.join('&game_id=')}`;

      const streamsResponse = await fetch(url, {
        headers: {
          "Client-ID": clientId,
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!streamsResponse.ok) throw new Error("Something went wrong at the server");

      const dataTojson: StreamsResponse = await streamsResponse.json();
      const updatedStreamersData = cursor ? [...streamersData, ...dataTojson.data] : dataTojson.data;

      // Solo recolectar IDs después de actualizar streamersData
      const streamDataForImgProfile = updatedStreamersData.map((streamer) => streamer.user_id).join('&id=');
      const streamersUserResponse = await fetch(`https://api.twitch.tv/helix/users?id=${streamDataForImgProfile}`, {
        headers: {
          "Client-ID": clientId,
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!streamersUserResponse.ok) throw new Error(`HTTP error! status: ${streamersUserResponse.status}`);

      const streamersDataToJson = await streamersUserResponse.json();
      const profiles = (streamersDataToJson.data || []).reduce((acc: any, user: any) => {
        acc[user.id] = user.profile_image_url;
        return acc;
      }, {});

      // Actualiza los streamersData con las imágenes de perfil
      setStreamersData(updatedStreamersData.map((streamer) => ({
        ...streamer,
        profile_image_url: profiles[streamer.user_id] || '',
      })));

      if (dataTojson.pagination.cursor) {
        setNextCursor(dataTojson.pagination.cursor);
        setHasMore(true);
      } else {
        setNextCursor(undefined);
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching streams:", error);
    }
  };

  const fetchCategorys = async () => {
    const urlCategorys = `https://api.twitch.tv/helix/games/top`;

    try {
      const categorysResponse = await fetch(urlCategorys, {
        headers: {
          "Client-ID": clientId,
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!categorysResponse.ok) throw new Error("Something went wrong at the server");

      const categoryToJson: CategoriesResponse = await categorysResponse.json();
      setCategoryData(categoryToJson.data);
      setSelectedCategoryIds(categoryToJson.data.map(category => category.id)); // Set selected categories IDs
    } catch (err) {
      console.error("Error Fetching categories: ", err);
    }
  };

  useEffect(() => {
    fetchCategorys();
  }, []);

  useEffect(() => {
    fetchStreams();
  }, [searchQuery, selectedCategoryIds]);

  const handleLoadMore = () => {
    fetchStreams(nextCursor);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setStreamersData([]); 
    setNextCursor(undefined); 
  };

  const handleCategoryClick = (id: string) => {
    setSelectedCategoryIds([id]); 
    setStreamersData([]); 
    setNextCursor(undefined); 
  };

  return (
    <div className="container-search-stream">
      <HeaderSearchStreamComponent onSearchange={handleSearchChange} />

      {!!streamersData.length && (
        <div className="rooms-container-searchStreams">
          {streamersData.map((streamer) => (
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
      )}

      {hasMore && <SearchMoreButtonComponent onClick={handleLoadMore} />}

      <div className="category-streams-container">
        <h1 className="title-section-category">Top Games & Categories</h1>

        {!!categoryData.length && (
          <SwiperComponent className="mySwiper-most-watched" spaceBetween={1} slidesPerView={3}>
            {categoryData.map((category) => (
              <CardCategorysComponent
                onClick={handleCategoryClick}
                key={category.id}
                id={category.id}
                name={category.name}
                box_art_url={category.box_art_url}
              />
            ))}
          </SwiperComponent>
        )}
      </div>
    </div>
  );
}
