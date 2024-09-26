import { useEffect, useState } from "react";
import {
  FavoritesResponse,
  HistoryResponse,
} from "../../../common/interfaces/media.interface";
import "./styles/styles.css";
import CardComponent from "../../../common/components/sliderCards.component/sliderCard.component";
import { useAuth } from "../../../auth/auth.provider";
import CardSmallComponent from "../../../common/components/smallCard/cardContinueWatching.component";

const fetchJsonWithAuth = async (url: string, token: string) => {
  const res = await fetch(url, {
    method: "GET", // Use the GET method for fetching data
    headers: {
      Authorization: `Bearer ${token}`, // Include the token in the authorization header
      "Content-Type": "application/json", // Set content type to JSON
    },
  });

  // Check if the response is OK (status in the range 200-299)
  if (!res.ok) {
    throw new Error("Fetch error"); // Throw an error if the response is not OK
  }

  return res; // Return the response object
};

export default function FavoritesHistoryPage() {
  // State variables to manage data
  const [favorites, setFavorites] = useState<FavoritesResponse[]>([]); // Store favorites
  const [historyUser, setHistoryUser] = useState<HistoryResponse[]>([]); // Store user history
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  ); // Store error messages
  const [visibleFavorites, setVisibleFavorites] = useState(8); // Number of favorites to display initially
  const [visibleHistory, setVisibleHistory] = useState(6); // Number of history items to display initially
  const [showAllFavorites, setShowAllFavorites] = useState(false); // Toggle for showing all favorites
  const [showAllHistory, setShowAllHistory] = useState(false); // Toggle for showing all history
  const { getToken, getUser } = useAuth(); // Get functions for authentication

  const user = getUser(); // Get the current user

  // Effect to fetch favorites and history when component mounts
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page

    const fetchFavoritesAndHistory = async () => {
      const token = getToken(); // Retrieve the authentication token

      // Check if the user is authenticated
      if (!token) {
        setErrorMessage("User not authenticated"); // Set an error message if not authenticated
        return;
      }

      try {
        // Fetch favorites
        const favoritesUrl = `${import.meta.env.VITE_BACKEND_URL}/favorite`; // Construct the URL for favorites
        const favoritesData = await fetchJsonWithAuth(favoritesUrl, token); // Fetch favorites data
        const favoritesToJson =
          (await favoritesData.json()) as FavoritesResponse[]; // Parse JSON response

        setFavorites(favoritesToJson); // Update state with favorites data

        // Fetch user history
        const fetchHistory = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/historyuser`,
          {
            method: "GET", // Use GET method to fetch history
            headers: {
              "Content-Type": "application/json", // Set content type to JSON
              Authorization: `Bearer ${token}`, // Include token in the request headers
            },
          }
        );

        // Check if fetching history was successful
        if (!fetchHistory.ok) {
          const errorMessage = await fetchHistory.json(); // Parse error message from response
          setErrorMessage(errorMessage); // Update error state with the message
          throw new Error(errorMessage); // Throw an error if fetching history fails
        }

        const historyToJson = await fetchHistory.json(); // Parse history JSON response
        setHistoryUser(historyToJson); // Update state with history data
      } catch (err) {
        setErrorMessage("An error occurred while fetching data"); // Set a generic error message
        console.error("Error fetching data:", err); // Log the error to the console
      }
    };

    fetchFavoritesAndHistory(); // Call the function to fetch data
  }, [getToken]); // Dependency array to run effect when the token changes

  // Function to toggle visibility of favorites
  const handleToggleShow = () => {
    setVisibleFavorites(showAllFavorites ? 8 : favorites.length); // Update the number of visible favorites
    setShowAllFavorites(!showAllFavorites); // Toggle the state for showing all favorites
  };

  // Function to toggle visibility of history
  const handleToggleShowHistory = () => {
    setVisibleHistory(showAllHistory ? 6 : historyUser.length); // Update the number of visible history items
    setShowAllHistory(!showAllHistory); // Toggle the state for showing all history
  };

  return (
    <div className="container-favorites-page">
      <h1 className="titleFavorite">
        Your favorites <span>{user.username}</span>
      </h1>

      <div className="favorites-grid">
        {favorites.slice(0, visibleFavorites).map((item) => (
          <CardComponent
            key={item.id}
            id={item.mediaId}
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
