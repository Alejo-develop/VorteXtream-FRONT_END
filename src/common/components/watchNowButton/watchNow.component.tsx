import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface WatchButtonProps {
  id: string | number;
  imgMedia: string;
  mediaTitle: string;
  rating: number;
  synopsis: string;
  text: string;
  size: string;
  height: string;
  fontweight: string;
  type?: string;
  typeMedia?: string;
}

const StyledButton = styled.button<WatchButtonProps>`
  font-size: ${(props) => props.fontweight}rem;
  padding: 10px;
  width: ${(props) =>
    props.size}px; // Usa props.size para acceder al valor de size
  border: none;
  outline: none;
  border-radius: 0.4rem;
  cursor: pointer;
  text-transform: uppercase;
  background-color: rgb(14, 14, 26);
  color: rgb(234, 234, 234); /* Color del texto por defecto */
  margin-left: 10px;
  font-weight: 500;
  transition: 0.6s;
  height: ${(props) => props.height}px;
  box-shadow: 0px 0px 60px #1f4c65;
  -webkit-box-reflect: below 10px
    linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.2));

  &:hover {
    background: linear-gradient(
      270deg,
      #f08080,
      #ffb6b6
    ); /* Gradiente al pasar el cursor */
    color: black; /* Mantiene el texto oscuro en hover */
  }

  @media screen and (width <= 412px){
    margin-left:0;
  }
`;

const WatchNowButtonComponent: React.FC<WatchButtonProps> = ({
  id,
  imgMedia,
  mediaTitle,
  synopsis,
  rating,
  type,
  text,
  size,
  height,
  fontweight,
  typeMedia
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/watch", {
      state: {
        id,
        imgMedia,
        mediaTitle,
        synopsis,
        rating,
        typeMedia
      },
    });
  };
  
  return (
    <StyledButton
      type={type}
      text={text}
      size={size}
      height={height}
      fontweight={fontweight}
      onClick={handleClick}
      id={id}
      mediaTitle={mediaTitle}
      imgMedia={imgMedia}
      rating={rating}
      synopsis={synopsis}
    >
      {text}
    </StyledButton>
  );
};

export default WatchNowButtonComponent;
