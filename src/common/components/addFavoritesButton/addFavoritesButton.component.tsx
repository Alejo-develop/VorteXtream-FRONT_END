import React from "react";
import styled from "styled-components";
import { useAuth } from "../../../auth/auth.provider";
import useAlert from "../alert/alert.component";

interface AddFavoritesButtonProps {
  size: string;
  height: string;
  fontweight: string;
  mediaId: string;
  backdrop_path: string;
  title: string;
  overview: string;
  vote_average: number;
}

interface FavoritesResponseInterface {
  id: string;
  userId: string;
  mediaId: string;
  backdrop_path: string;
  title: string;
  overview: string;
  vote_average: number;
}

interface FavoriteDto {
  userId: string;
  mediaId: string;
  backdrop_path: string;
  title: string;
  overview: string;
  vote_average: number;
}

const AddFavoritesButtonComponent: React.FC<AddFavoritesButtonProps> = ({
  size,
  height,
  fontweight,
  mediaId,
  title,
  vote_average,
  overview,
  backdrop_path,
}) => {
  const auth = useAuth();
  const token = auth.getToken();
  const user = auth.getUser();
  const { showAlert } = useAlert();

  const handleClick = async () => {
    try {
      const getFavorites = await fetch(
        `http://localhost:3000/vortextream/favorite/${mediaId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!getFavorites.ok) {
        const favoriteDto: FavoriteDto = {
          userId: user.id,
          mediaId: mediaId.toString(),
          backdrop_path,
          title,
          overview,
          vote_average,
        };

        try {
          const createFavorite = await fetch(
            `http://localhost:3000/vortextream/favorite`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(favoriteDto),
            }
          );

          if (!createFavorite.ok) throw new Error(createFavorite.statusText);

          showAlert("success", "added favorite", "this title has been successfully added to favorites")
        } catch (err) {
          console.error(err);
        }
      } else if (getFavorites.ok){
        const favoriteToJson =
          (await getFavorites.json()) as FavoritesResponseInterface;

        try {
          const removeFavorite = await fetch(
            `http://localhost:3000/vortextream/favorite/${favoriteToJson.id}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!removeFavorite.ok) throw new Error(removeFavorite.statusText);

          showAlert("success", "Remove successfully", "the title of the favorites has been successfully removed")
        } catch (err) {
          console.error(err);
        }
      }
    } catch (err) {
      console.error(err);
      showAlert("error", "Error adding favorite", "Error adding to favorites")
    }
  };

  return (
    <StyledButton
      backdrop_path={backdrop_path}
      mediaId={mediaId}
      title={title}
      overview={overview}
      vote_average={vote_average}
      size={size}
      height={height}
      fontweight={fontweight}
      onClick={handleClick}
    >
      Add Favorites
    </StyledButton>
  );
};

const StyledButton = styled.button<AddFavoritesButtonProps>`
  font-size: ${(props) => props.fontweight}rem;
  padding: 10px;
  width: ${(props) => props.size}px;
  border: none;
  outline: none;
  border-radius: 0.4rem;
  cursor: pointer;
  text-transform: uppercase;
  background-color: rgb(14, 14, 26);
  color: rgb(234, 234, 234);
  margin-left: 10px;
  font-weight: 500;
  transition: 0.6s;
  box-shadow: 0px 0px 60px #1f4c65;
  height: ${(props) => props.height}px;
  -webkit-box-reflect: below 10px
    linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4));

  /* Mueve el botón hacia la izquierda */

  &:hover {
    background: linear-gradient(270deg, #bcece0, #e0f0f0);
    color: black; /* Mantiene el texto oscuro en hover */
  }
`;

export default AddFavoritesButtonComponent;
