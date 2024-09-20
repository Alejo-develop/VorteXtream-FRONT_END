import React from "react";
import styled from "styled-components";

interface AddFavoritesButtonProps {
  size: string;
  height: string;
  fontweight: string;
  addFavorites: () => void;
}

const AddFavoritesButtonComponent: React.FC<AddFavoritesButtonProps> = ({ size, height, fontweight, addFavorites}) => {
  const handleClick = () => {
    addFavorites();
  };

  return <StyledButton size={size} height={height} fontweight={fontweight} onClick={handleClick}>Add Favorites</StyledButton>;
};

const StyledButton = styled.button<AddFavoritesButtonProps>`
  font-size: ${props => props.fontweight}rem;
  padding: 10px;
  width: ${props => props.size}px;
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
  height: ${props => props.height}px;
  -webkit-box-reflect: below 10px
    linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4));

  /* Mueve el botón hacia la izquierda */

  &:hover {
    background: linear-gradient(270deg, #bcece0, #e0f0f0);
    color: black; /* Mantiene el texto oscuro en hover */
  }
`;

export default AddFavoritesButtonComponent;
