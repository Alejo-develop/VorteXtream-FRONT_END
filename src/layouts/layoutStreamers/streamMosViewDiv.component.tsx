import React from "react";
import styled from "styled-components";

interface StreamMostViewProps {
  id: string;
  game_name: string;
  type: string;
  user_name: string;
  viewer_count: number
  thumbnail_url: string;
}

const StreamMostViewComponent = ({ thumbnail_url, id, game_name, type, user_name, viewer_count }: StreamMostViewProps) => {
    
    return (
    <StyledWrapper thumbnail_url={thumbnail_url} id={id} type={type} user_name={user_name} viewer_count={viewer_count} game_name={game_name} >
      <div className="input__container">
        <div className="shadow__input" />
        <button style={{width: '4.5rem', padding: '0'}} className="input__button__shadow">

            <img style={{width: '100%', height: '2.5rem'}} src={thumbnail_url} alt="streamer-img" />
        
        </button>
        
        <button name="username" className="input__search">
          {game_name}
        </button> 
      <h5 style={{color: 'white'}}>Viwers: {viewer_count}</h5>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div<StreamMostViewProps>`
  .input__container {
    position: relative;
    background: #2f3241; /* Color de fondo */
    padding: 15px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 15px;
    border: 4px solid #f08080; /* Color del borde */
    max-width: 252px;
    height: 3.3rem;
    transition: all 400ms cubic-bezier(0.23, 1, 0.32, 1);
    transform-style: preserve-3d;
    transform: rotateX(10deg) rotateY(-10deg);
    perspective: 1000px;
    box-shadow: 10px 10px 0 #f08080; /* Color de la sombra */
    margin-left: 1rem;
    margin-bottom: 3rem
  }

  .input__container:hover {
    transform: rotateX(5deg) rotateY(1deg) scale(1.05); /* Corrige el espacio */
    box-shadow: 25px 25px 0 -5px #f08080, 25px 25px 0 0 #f08080; /* Color de la sombra */
  }

  .shadow__input {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    bottom: 0;
    z-index: -1;
    transform: translateZ(-50px);
    background: linear-gradient(
      45deg,
      rgba(255, 107, 107, 0.4) 0%,
      rgba(255, 107, 107, 0.1) 100%
    );
    filter: blur(20px);
  }

  .input__button__shadow {
    cursor: pointer;
    border: 3px solid #f08080; /* Color del borde */
    background: #2f3241; /* Color de fondo */
    transition: all 400ms cubic-bezier(0.23, 1, 0.32, 1);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    transform: translateZ(20px);
    position: relative;
    z-index: 3;
    font-weight: bold;
    text-transform: uppercase;
  }

  .input__button__shadow:hover {
    background: #2f3241; /* Color de fondo */
    transform: translateZ(10px) translateX(-5px) translateY(-5px);
    box-shadow: 5px 5px 0 0 #f08080; /* Color de la sombra */
  }

  .input__button__shadow svg {
    fill: white; /* Color del SVG */
    width: 25px;
    height: 25px;
  }

  .input__search {
    width: 100%;
    outline: none;
    border: 3px solid #f08080; /* Color del borde */
    padding: 15px;
    font-size: 13px;
    background: #2f3241; /* Color de fondo */
    color: white; /* Color del texto */
    transform: translateZ(10px);
    transition: all 400ms cubic-bezier(0.23, 1, 0.32, 1);
    position: relative;
    z-index: 3;
    font-family: "Roboto", Arial, sans-serif;
    letter-spacing: -0.5px;
  }

  .input__search::placeholder {
    color: #f08080; /* Color del placeholder */
    font-weight: bold;
    text-transform: uppercase;
  }

  .input__search:hover,
  .input__search:focus {
    background: #2f3241; /* Color de fondo */
    transform: translateZ(20px) translateX(-5px) translateY(-5px);
    box-shadow: 5px 5px 0 0 #f08080; /* Color de la sombra */
  }

  .input__container::before {
    content: "${props => props.user_name}";;
    position: absolute;
    top: -15px;
    left: 20px;
    background: #2f3241; /* Color de fondo */
    color: white; /* Color del texto */
    font-weight: bold;
    padding: 5px 10px;
    font-size: 14px;
    transform: translateZ(50px);
    z-index: 4;
    border: 2px solid #f08080; /* Color del borde */
  }
`;

export default StreamMostViewComponent;
