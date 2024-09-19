import React from "react";
import styled from "styled-components";

const ButtonSubmitAdmin = () => {
  return (
    <StyledWrapper>
      <button> Create</button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center; /* Centra el botón horizontalmente */
  align-items: center;     /* Centra el botón verticalmente si es necesario */
  height: 100%;    /* Ajusta según el contenedor padre */

  button {
    font-size: 18px;
    letter-spacing: 2px;
    text-transform: uppercase;
    display: inline-block;
    text-align: center;
    font-weight: bold;
    padding: 0.7em 2em;
    border: none; /* Eliminamos el borde */
    border-radius: 2px;
    position: relative;
    background: transparent; /* Fondo transparente */
    color: #fff;
    text-decoration: none;
    transition: 0.3s ease all;
    z-index: 1;
     
  }

  button:before {
    transition: 0.5s all ease;
    position: absolute;
    top: 0;
    left: 50%;
    right: 50%;
    bottom: 0;
    opacity: 0;
    content: '';
    background-color: #FFB6C1; /* Color más suave para el hover */
    z-index: -1;
  }

  button:hover, button:focus {
    color: white;
  }

  button:hover:before, button:focus:before {
    transition: 0.5s all ease;
    left: 0;
    right: 0;
    opacity: 1;
  }

  button:active {
    transform: scale(0.9);
  }
`;

export default ButtonSubmitAdmin;
