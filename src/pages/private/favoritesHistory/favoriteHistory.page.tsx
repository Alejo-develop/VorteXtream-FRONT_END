import React, { useEffect, useState } from "react";
import { CardProps } from "../../../common/interfaces/media.interface";
import "./styles/styles.css";
import CardComponent from "../../../common/components/sliderCards.component/sliderCard.component";
import FooterComponent from "../../../common/components/footer/footer.component";
import { useAuth } from "../../../auth/auth.provider";

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
  return res.json();
};

export default function FavoritesHistoryPage() {
  const [favorites, setFavorites] = useState<CardProps[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const [visibleCount, setVisibleCount] = useState(8); // Estado inicial para contar elementos visibles
  const [showAll, setShowAll] = useState(false); // Nuevo estado para alternar entre mostrar más o menos
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchFavorites = async () => {
      const token = getToken();
      if (!token) {
        setErrorMessage("User not authenticated");
        return;
      }

      try {
        const url = `http://localhost:3000/vortextream/favorite`;
        const favoritesData = await fetchJsonWithAuth(url, token);

        const imageBaseUrl = "https://image.tmdb.org/t/p/w1280";
        const formattedFavorites = favoritesData
          .filter((media: CardProps) => media.backdrop_path && media.overview)
          .map((media: CardProps) => ({
            id: media.id,
            imageUrl: `${imageBaseUrl}${media.backdrop_path}`,
            overview: media.overview,
            title: media.title,
            vote_average: media.vote_average,
          }));

        setFavorites(formattedFavorites);
      } catch (err) {
        setErrorMessage("An error occurred while fetching favorites");
        console.error("Error fetching favorites:", err);
      }
    };

    fetchFavorites();
  }, [getToken]);

  // Manejar clic en "Show More" o "Show Less"
  const handleToggleShow = () => {
    if (showAll) {
      setVisibleCount(8); // Volver a mostrar solo los primeros 8 elementos
    } else {
      setVisibleCount(favorites.length); // Mostrar todos los elementos
    }
    setShowAll(!showAll); // Alternar estado entre mostrar todo o parte
  };

  return (
    <div className="container-favorites-page">
      <h1 className="titleFavorite">My Favorites</h1>

      <div className="favorites-grid">
        {favorites.slice(0, visibleCount).map((item) => (
          <CardComponent
            key={item.id}
            id={item.id}
            backdrop_path={item.imageUrl}
            overview={item.overview}
            title={item.title}
            vote_average={item.vote_average}
          />
        ))}
      </div>

      {favorites.length > 8 && (
        <button onClick={handleToggleShow} className="show-more-button">
          {showAll ? "Show Less" : "Show More"}
        </button>
      )}

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}
