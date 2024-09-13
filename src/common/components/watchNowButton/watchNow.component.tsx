import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface WatchButtonProps {
  size: string;
  height: string;
  fontweight: string;
  text: string
}

const StyledButton = styled.button<WatchButtonProps>`
  font-size: ${props => props.fontweight}rem;
  padding: 10px;
  width: ${props => props.size}px; // Usa props.size para acceder al valor de size
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
  height: ${props => props.height}px;
  box-shadow: 0px 0px 60px #1f4c65;
  -webkit-box-reflect: below 10px linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.2));

  &:hover {
    background: linear-gradient(270deg, #F08080, #FFB6B6); /* Gradiente al pasar el cursor */
    color: black; /* Mantiene el texto oscuro en hover */
  }
`;

const WatchNowButtonComponent: React.FC<WatchButtonProps> = ({ text, size, height, fontweight}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <StyledButton text={text} size={size} height={height} fontweight={fontweight} onClick={handleClick}>
      {text}
    </StyledButton>
  );
};

export default WatchNowButtonComponent;
