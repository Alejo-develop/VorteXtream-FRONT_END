import React from "react";
import styled from "styled-components";
import { useAuth } from "../../../auth/auth.provider";

interface AddFavoritesButtonProps {
  size: string;
  height: string;
  fontweight: string;
  mediaId: string;
  imgMedia: string;
  mediaTitle: string;
  synopsis: string;
  raiting: number;
}

interface FavoritesResponseInterface {
  id: string;
  userId: string;
  mediaId: string;
  imgMedia: string;
  mediaTitle: string;
  synopsis: string;
  rating: number;
}

interface FavoriteDto {
  userId: string;
  mediaId: string;
  imgMedia: string;
  mediaTitle: string;
  synopsis: string;
  raiting: number;
}

const AddFavoritesButtonComponent: React.FC<AddFavoritesButtonProps> = ({
  size,
  height,
  fontweight,
  mediaId,
  mediaTitle,
  raiting,
  synopsis,
  imgMedia,
}) => {
  const auth = useAuth();
  const token = auth.getToken();
  const user = auth.getUser();

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
          imgMedia,
          mediaTitle,
          synopsis,
          raiting,
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
          const createFavoriteToJson = await createFavorite.json()
          console.log('res', createFavoriteToJson);
          
          if (!createFavorite.ok) throw new Error(createFavorite.statusText);

          alert("Add favorite!");
        } catch (err) {
          console.error(err);
        }
      } else {
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

          alert('delete successfully')
          console.log(removeFavorite.json());
        } catch (err) {
          console.error(err);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <StyledButton
      imgMedia={imgMedia}
      mediaId={mediaId}
      mediaTitle={mediaTitle}
      synopsis={synopsis}
      raiting={raiting}
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
