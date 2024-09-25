import styled from "styled-components";
import { Streamer } from "../../interfaces/streamer.interface";
import { useNavigate } from "react-router-dom";

const CardStreamerComponent = ({
  id,
  game_name,
  title,
  user_name,
  viewer_count,
  thumbnail_url,
  profile_image_url
}: Streamer) => {
  const imageWidth = 334; // Ancho deseado en píxeles
  const imageHeight = 169; // Altura deseada en píxeles

  // Construir la URL de la imagen dinámica
  const imageUrl = thumbnail_url
    ? thumbnail_url
        .replace("{width}", imageWidth.toString())
        .replace("{height}", imageHeight.toString())
    : "";

  const goTo = useNavigate();

  const handleClick = () => {
    goTo(`/watchstream/${user_name}`, {
      state: {
        user_name,
        game_name,
        title,
        viewer_count,
        profile_image_url
      },
    });
  };

  return (
    <StyledWrapper>
      <div onClick={handleClick} className="main" key={id}>
        <div className="card">
          <div className="fl">
            <div className="fullscreen"></div>
          </div>
          <div className="card_content">
            <label className="switch_738">
              <img
                src={imageUrl}
                alt="img-stream-banner"
                className="img-banner-streamer"
              />
            </label>
          </div>
          <div className="card_back" />
        </div>
        <div className="data">
          <div className="img"><img style={{width: '100%', height: '2.5rem'}} src={profile_image_url} alt="streamerPorfileUser" /></div>
          <div className="text">
            <div className="text_m">{title}</div>
            <div className="text_s">{game_name}</div>
          </div>
        </div>
        <div className="btns">
          <div className="views">
            <svg className="views_svg" viewBox="0 0 30.5 16.5">
              <path d="M15.3 0C8.9 0 3.3 3.3 0 8.3c3.3 5 8.9 8.3 15.3 8.3s12-3.3 15.3-8.3C27.3 3.3 21.7 0 15.3 0zm0 14.5c-3.4 0-6.2-2.8-6.2-6.2C9 4.8 11.8 2 15.3 2c3.4 0 6.2 2.8 6.2 6.2 0 3.5-2.8 6.3-6.2 6.3z" />
            </svg>
            <span className="views_text">{viewer_count}</span>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  /* CodePen Card */

.card {
  width: 21rem;
  height: 10em;
  background-color: #252525;
  border-radius: 7px;
  cursor: pointer;
}

.card:hover {
  box-shadow: 10px 10px 0 #252525;
}
.img-banner-streamer{
  position: absolute;
  left: -10rem;
  top: -4rem;
  border-radius:10px
}

.img-banner-streamer:hover {
  filter: brightness(90%); /* Reduce el brillo al 70% para oscurecer la imagen */
}

.fl {
  display: flex;
  justify-content: flex-end;
  opacity: 0;

}


.fullscreen {
  width: 1.5em;
  height: 1.5em;
  border-radius: 5px;
  background-color: #727890;
  margin: 1em;
  margin-right: 0.5em;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: .2s ease-in-out;
  box-shadow: 2px 2px 6px rgba(0,0,0,.4);
}

.fullscreen_svg {
  width: 15px;
  height: 15px;
  fill: rgb(177, 176, 176);
  transition: .2s ease-in-out;
}

.card_back {
  position: absolute;
  width: 21rem;
  height: 13em;
  background-color: rgba(30, 31, 38, 0.575);
  border-radius: 7px;
  margin-top: -5em;
  margin-left: 0.7em;
  transition: .2s ease-in-out;
  z-index: -1;
}

.card_back:hover {
  box-shadow: 12px 12px 0 #F08080;
}

.main:hover .card_back {
  margin-top: -6.25em;
  margin-left: 0em;
  scale: 1.1;
  height: 15.25em;
  cursor: pointer;
}

.data {
  display: flex;
  flex-direction: row;
  margin-top: 1em;
}

.img {
  width: 2.25em;
  height: 2.25em;
  background-color: #252525;
  border-radius: 5px;
  overflow: hidden;
}

.text {
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-left: 0.5em;
  font-family: Montserrat;
  color: white;
  max-width: 16rem;
  overflow: hidden; /* Oculta el contenido que se desborda */
}

.text_m {
  font-weight: bold;
  font-size: 0.9em;
  white-space: nowrap; /* Evita que el texto se envuelva en varias líneas */
  width: 100%; /* Ancho del texto igual al contenedor */
  animation: scrollText 10s linear infinite;
  margin-bottom: 2px 
  display: inline-block; /* Necesario para el desplazamiento */
  position: relative;
}

.text_s {
  font-size: 0.7em;
  color: #F08080
}

.btns {
  display: flex;
  gap: 0.5em;
  transition: .2s ease-in-out;
}

.likes {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4em;
  height: 1.4em;
  border-radius: 4px;
  margin-top: -0.5em;
  opacity: 0;
  background-color: #F08080;
  transition: .2s ease-in-out;
}

.likes_text {
  font-size: 0.8em;
  margin-left: 0.25em;
  color: white;
}

.likes_svg {
  width: 12px;
  height: 12px;
  fill: #2F3241;
}

.likes:hover {
  background-color: #5A5F73;
  cursor: pointer;
}

.views {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4em;
  height: 1.4em;
  border-radius: 4px;
  margin-top: -0.5em;
  opacity: 0;
  background-color: #F08080;
  transition: .28s ease-in-out;
}

.views_text {
  font-size: 0.7em;
  margin-left: 0.25em;
  color: white;
}

.views_svg {
  width: 12px;
  height: 12px;
  fill: #2F3241;
}

.views:hover {
  background-color: #5A5F73;
  cursor: pointer;
}

.main:hover .likes {
  margin-top: 0.5em;
  opacity: 1;
}

.main:hover .views {
  margin-top: 0.5em;
  opacity: 1;
}



/* The Main Switch */

.card_content {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* The switch - the box around the slider */
.switch_738 {
  font-size: 13px;
  position: relative;
  display: inline-block;
  width: 1.2em;
  height: 3.3em;
}
 @keyframes scrollText {
  0% {
    transform: translateX(100%); /* Comienza fuera del contenedor a la derecha */
  }
  100% {
    transform: translateX(-250%); /* Mueve el texto completamente a la izquierda */
  }
}
`;

export default CardStreamerComponent;
