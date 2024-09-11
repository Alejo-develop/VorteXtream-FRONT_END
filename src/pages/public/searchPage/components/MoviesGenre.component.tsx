import { useEffect, useState } from "react";
import SwiperComponent from "../../../../common/components/sliderCards.component/swiperComponent/swiperSlider.component";
import CardComponent from "../../../../common/components/sliderCards.component/sliderCard.component";
import { CardProps } from "../../../../common/interfaces/media.interface";

import '../styles/moviesGenre.css'

interface MovieData {
  genreId: number;
  genreName: string;
}

interface MoviesByGenreComponentProps {
  genres: MovieData[];
  moviesByGenre: { [key: number]: CardProps[] };
}

export const MoviesByGenreComponent = ({ genres, moviesByGenre }: MoviesByGenreComponentProps) => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

  return (
    <div className="container-moviesByGenre">
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {genres.length === 0 ? (
        <p className="no-movies-message">No movies available</p>
      ) : (
        genres.map((genre) => (
          <div key={genre.genreId} className="genre-section">
            <h1 className="mostWatched-genre-title">
              Most Watched {genre.genreName}
            </h1>
            <SwiperComponent>
              {moviesByGenre[genre.genreId]?.map((movie) => (
                <CardComponent
                  key={movie.id}
                  id={movie.id}
                  backdrop_path={movie.imageUrl}
                  overview={movie.overview}
                  title={movie.title}
                  vote_average={movie.vote_average}
                />
              ))}
            </SwiperComponent>
          </div>
        ))
      )}
    </div>
  );
};
