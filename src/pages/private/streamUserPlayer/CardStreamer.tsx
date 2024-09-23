import React from "react";
import styled from "styled-components";

interface CardStreamerProps {
  description?: string;
  text: string;
  textSize?: string; // Tamaño de texto opcional
  component?: React.ReactNode; // Componente opcional
}

const CardStreamer = ({ description, text, textSize = "16px", component }: CardStreamerProps) => {
  return (
    <StyledWrapper>
      <div className="card">
        <span className="card__title" style={{ fontSize: textSize }}>
          {text}
        </span>
        <p className="card__content" style={{ fontSize: textSize }}>
          {description}
        </p>
        {component && <div className="card__component">{component}</div>}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    width: 350px;
    height: auto;
    padding: 20px;
    background: #2e4053 ;
    border: 6px solid #000;
    box-shadow: 4px 4px 0 #F08080; /* Cambiado a #F08080 */
    transition: transform 0.3s, box-shadow 0.3s;
  }

  .card:hover {
    transform: translate(-5px, -5px);
    box-shadow: 17px 17px 0 #F08080; /* Cambiado a #F08080 */
    transition: transform 0.3s, box-shadow 0.3s;
  }

  .card__title {
    font-weight: 900;
    color: #fff;
    text-transform: uppercase;
    margin-bottom: 15px;
    display: block;
    position: relative;
    overflow: hidden;
  }

  .card__title::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 90%;
    height: 3px;
    background-color: #F08080;
    transform: translateX(-100%);
    transition: transform 0.3s;
  }

  .card:hover .card__title::after {
    transform: translateX(0);
  }

  .card__content {
    line-height: 1.4;
    color: #fff;
    margin-bottom: 20px;
  }

  .card__component {
    margin-top: 10px;
  }
`;

export default CardStreamer;
