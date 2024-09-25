import { useEffect, useState } from "react";
import { FavoritesResponse, HistoryResponse } from "../../../common/interfaces/media.interface";
import "./styles/styles.css";
import CardComponent from "../../../common/components/sliderCards.component/sliderCard.component";
import { useAuth } from "../../../auth/auth.provider";
import CardSmallComponent from "../../../common/components/smallCard/cardContinueWatching.component";

const fetchJsonWithAuth = async (url: string, token: string) => {
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error("Fetch error");
  }
  return res;
};

export default function FavoritesHistoryPage() {
  const [favorites, setFavorites] = useState<FavoritesResponse []>([]);
  const [historyUser, setHistoryUser] = useState<HistoryResponse[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const [visibleFavorites, setVisibleFavorites] = useState(8);
  const [visibleHistory, setVisibleHistory] = useState(6);
  const [showAllFavorites, setShowAllFavorites] = useState(false);
  const [showAllHistory, setShowAllHistory] = useState(false);
  const { getToken, getUser } = useAuth()

  const user = getUser()
  useEffect(() => {
    const fetchFavoritesAndHistory = async () => {
      const token = getToken();
  
      if (!token) {
        setErrorMessage("User not authenticated");
        return;
      }

      try {
        // Obtener favoritos
        const favoritesUrl = `${import.meta.env.VITE_BACKEND_URL}/favorite`;
        const favoritesData = await fetchJsonWithAuth(favoritesUrl, token);
        const favoritesToJson = await favoritesData.json() as FavoritesResponse []

        setFavorites(favoritesToJson);

        const fetchHistory = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/historyuser`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!fetchHistory.ok) {
          const errorMessage = await fetchHistory.json();
          setErrorMessage(errorMessage);
          throw new Error(errorMessage);
        }

        const historyToJson = await fetchHistory.json();

        setHistoryUser(historyToJson);
      } catch (err) {
        setErrorMessage("An error occurred while fetching data");
        console.error("Error fetching data:", err);
      }
    };

    fetchFavoritesAndHistory();
  }, [getToken]);

  const handleToggleShow = () => {
    setVisibleFavorites(showAllFavorites ? 8 : favorites.length);
    setShowAllFavorites(!showAllFavorites);
  };

  const handleToggleShowHistory = () => {
    setVisibleHistory(showAllHistory ? 6 : historyUser.length);
    setShowAllHistory(!showAllHistory);
  };

  return (
    <div className="container-favorites-page">
      <h1 className="titleFavorite">Your favorites <span>{user.username}</span></h1>

      <div className="favorites-grid">
        {favorites.slice(0, visibleFavorites).map((item) => (
          <CardComponent
            key={item.id}
            id={item.id}
            backdrop_path={item.backdrop_path}
            overview={item.overview}
            title={item.title}
            vote_average={item.vote_average}
            
          />
        ))}
      </div>

      {favorites.length > 8 && (
        <button onClick={handleToggleShow} className="show-more-button">
          {showAllFavorites ? "Show Less" : "Show More"}
        </button>
      )}

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <h1 className="titleFavorite">History</h1>

      <div className="history-grid">
        {historyUser.slice(0, visibleHistory).map((movie) => (
          <CardSmallComponent
            key={movie.mediaId}
            id={movie.mediaId}
            imageUrl={movie.imgMedia}
            title={movie.mediaTitle}
            vote_average={movie.rating}
            overview={movie.synopsis}
            typeMedia={movie.typeMedia || ""}
          />
        ))}
      </div>

      {historyUser.length > 6 && (
        <button onClick={handleToggleShowHistory} className="show-more-button">
          {showAllHistory ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
}
