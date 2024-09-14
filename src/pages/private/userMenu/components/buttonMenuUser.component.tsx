import React from 'react';
import styled from 'styled-components';

interface hButtonProps {
  size: string;
  height: string;
  fontweight: string;
  text: string;
  type?: string;
  onClick?: () => void
}

const StyledButton = styled.button<hButtonProps>`
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

const ButtonMenuUserComponent: React.FC<hButtonProps> = ({ onClick, type, text, size, height, fontweight}) => {

  return (
    <StyledButton type={type} text={text} size={size} height={height} fontweight={fontweight} onClick={onClick}>
      {text}
    </StyledButton>
  );
};

export default ButtonMenuUserComponent;
