import { ReactNode } from "react";
import styled from "styled-components";

interface PlanCardProps {
  text: string;
  benefices: any[];
  title: string;
  icono: ReactNode;
  price: string;
}

const PlanSubscriptionCardComponent = ({
  text,
  title,
  benefices,
  icono,
  price
}: PlanCardProps) => {
  return (
    <StyledWrapper>
      <div className="card">
        <div className="content">
          <div className="back">
            <div className="back-content">
              <h1>{text}</h1>
            </div>
          </div>
          <div className="front">
            <div className="front-content">
              <h1 className="badge">{title}</h1>
             <div>
                {icono}
             </div>
             <p>{price}</p>
              <div className="description">
                <div className="title">
                  {benefices.map((ben) => (
                    <p className="title">
                      <strong>{ben}</strong>
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    overflow: visible;
    width: 20rem;
    height: 35rem;
  }

  .content {
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 300ms;
    border-radius: 5px;
  }

  .front,
  .back {
    background-color: #151515;
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 5px;
    overflow: hidden;
  }

  .back {
    justify-content: center;
    display: flex;
    align-items: center;
    overflow: hidden;
  }

  .back::before {
    position: absolute;
    content: " ";
    display: block;
    width: 160px;
    height: 160%;
    background: linear-gradient(
      90deg,
      transparent,
      #f08080,
      #f08080,
      #f08080,
      #f08080,
      transparent
    );
    animation: rotation_481 5000ms infinite linear;
  }

  .back-content {
    position: absolute;
    width: 100%;
    height: 99%;
    background-color: #151515;
    border-radius: 5px;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
  }

  .card:hover .content {
    transform: rotateY(180deg);
  }

  @keyframes rotation_481 {
    0% {
      transform: rotateZ(0deg);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }

  .front {
    transform: rotateY(180deg);
    color: white;
    box-shadow: 0 4px 20px rgba(240, 128, 128, 0.5);
    transition: box-shadow 300ms ease;
  }

  .front .front-content {
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 10px;
    display: flex;
    left: -0.7rem;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }

  .front-content .badge {
    width: fit-content;
    text-align: center;
    color: #f08080;
    margin: 0;
  }

  .description {
    width: 100%;
    margin: 0rem;
    padding: 10px;
    height: 20rem;
    background-color: #00000099;
    backdrop-filter: blur(5px);
    border-radius: 5px;
    text-align: center;
  }

  .title {
    font-size: 15px;
    max-width: 100%;
    display: flex;
    height: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .title p {
    width: 90%;
    text-align: center;
    transition: color 300ms ease, transform 300ms ease;
  }

  .title p:hover {
    color: #f08080; /* Cambia a un color más intenso al hacer hover */
    transform: scale(1.05); /* Escala ligeramente al hacer hover */
    text-shadow: 0 0 5px rgba(240, 128, 128, 0.7); /* Sombra de texto */
  }
`;

export default PlanSubscriptionCardComponent;
