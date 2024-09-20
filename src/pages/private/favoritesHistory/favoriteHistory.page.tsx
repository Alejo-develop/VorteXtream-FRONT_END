import { useCallback, useState, useEffect } from "react";
import { CardProps } from "../../../common/interfaces/media.interface";
import { FavoriteSearch } from "./components/searchfavorite";
import "./styles/styles.css";
import CardComponent from "../../../common/components/sliderCards.component/sliderCard.component";

const fetchJson = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Fetch error");
  }
  return res.json();
};

export default function FavoritesHistoryPage() {
  const [searchResults, setSearchResults] = useState<CardProps[]>([]);
  const [favoriteResults, setFavoriteResults] = useState<CardProps[]>([]);
  const [continueWatchingResults, setContinueWatchingResults] = useState<CardProps[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const [favoritePage, setFavoritePage] = useState(1);
  const [searchPage, setSearchPage] = useState(1);
  const itemsPerPage = 6;

  const searchMoviesFavorites = useCallback(async (query: string) => {
    if (!query) return;
    try {
      const searchUrl = `http://localhost:3000/favorite`;
      const data = await fetchJson(searchUrl);
      const filteredResults = data.results
        .filter((media: CardProps) => media.backdrop_path && media.overview)
        .map((media: CardProps) => ({
          id: media.id,
          backdrop_path: media.backdrop_path,
          overview: media.overview,
          title: media.title,
          vote_average: media.vote_average,
        }));
      setSearchResults(filteredResults);
      setSearchPage(1);
    } catch (error) {
      setErrorMessage("An error occurred while fetching search results");
      console.error("Error fetching search results:", error);
    }
  }, []);

  const fetchMoviesFavorites = useCallback(async () => {
    try {
      const favoritesUrl = `http://localhost:3000/favorite`;
      const data = await fetchJson(favoritesUrl);
      const filteredResults = data.results
        .filter((media: CardProps) => media.backdrop_path && media.overview)
        .map((media: CardProps) => ({
          id: media.id,
          backdrop_path: media.backdrop_path,
          overview: media.overview,
          title: media.title,
          vote_average: media.vote_average,
        }));
      setFavoriteResults(filteredResults);
    } catch (error) {
      setErrorMessage("An error occurred while fetching favorites");
      console.error("Error fetching favorites:", error);
    }
  }, []);

  const fetchContinueWatching = useCallback(async () => {
    try {
      const continueWatchingUrl = `http://localhost:3000/continue-watching`;
      const data = await fetchJson(continueWatchingUrl);
      const filteredResults = data.results
        .filter((media: CardProps) => media.backdrop_path && media.overview)
        .map((media: CardProps) => ({
          id: media.id,
          backdrop_path: media.backdrop_path,
          overview: media.overview,
          title: media.title,
          vote_average: media.vote_average,
        }));
      setContinueWatchingResults(filteredResults);
    } catch (error) {
      setErrorMessage("An error occurred while fetching continue watching results");
      console.error("Error fetching continue watching results:", error);
    }
  }, []);

  useEffect(() => {
    fetchContinueWatching();
    fetchMoviesFavorites(); 
  }, [fetchContinueWatching, fetchMoviesFavorites, favoritePage]);

  const indexOfLastItem = searchPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchResults.slice(indexOfFirstItem, indexOfLastItem);

  const paginateSearch = (pageNumber: number) => setSearchPage(pageNumber);
  const paginateFavorites = (pageNumber: number) => setFavoritePage(pageNumber);

  return (
    <div>
      <div className="searchFavorite">
        <FavoriteSearch onSearch={searchMoviesFavorites} />
      </div>
      <h1 className="titleFavorite">My favorite</h1>

      {errorMessage && <p>{errorMessage}</p>}

      {/* Sección de resultados de favoritos */}
      {currentItems.length > 0 ? (
        <div className="search-results">
          {currentItems.map((movie) => (
            <CardComponent
              key={movie.id}
              id={movie.id}
              backdrop_path={movie.backdrop_path}
              overview={movie.overview}
              title={movie.title}
              vote_average={movie.vote_average}
            />
          ))}
        </div>
      ) : (
        <p>No favorites found</p>
      )}

      <div className="pagination">
        {Array.from({ length: Math.ceil(searchResults.length / itemsPerPage) }, (_, index) => (
          <button
            key={index}
            onClick={() => paginateFavorites(index + 1)}
            className={index + 1 === searchPage ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <h1 className="movieContinue">Continue Watching</h1>
      {continueWatchingResults.length > 0 ? (
        <div className="continue-watching-results">
          {continueWatchingResults.map((movie) => (
            <CardComponent
              key={movie.id}
              id={movie.id}
              backdrop_path={movie.backdrop_path}
              overview={movie.overview}
              title={movie.title}
              vote_average={movie.vote_average}
            />
          ))}
        </div>
      ) : (
        <p className="noContinue">No continue watching items found</p>
      )}
    </div>
  );
}
