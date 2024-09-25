import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface ButtonsInterface {
  text: string;
  path: string;
}

const ButtonHeaderComponent = ({ path, text }: ButtonsInterface) => {
  const goTo = useNavigate();

  const handleClick = () => {
    if (path === 'back') {
        goTo(-1); 
    } else {
        goTo(path); 
    }
  };

  return (
    <StyledWrapper>
      <button onClick={handleClick}>
        <span>{text}</span>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  /* From uiverse.io by @Ali-Tahmazi99 */
  button {
    background-color: transparent;
    display: inline-block;
    width: 150px;
    height: 50px;
    border: 0;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease-in;
    z-index: 1;
  }

  button::before,
  button::after {
    content: "";
    position: absolute;
    top: 0;
    width: 0;
    height: 100%;
    transform: skew(15deg);
    transition: all 0.5s;
    overflow: hidden;
    z-index: -1;
  }

  button::before {
    left: -10px;
    background: #2F3241;
  }

  button::after {
    right: -10px;
    background: #F08080;
  }

  button:hover::before,
  button:hover::after {
    width: 58%;
  }

  button:hover span {
    color: white;
    transition: 0.3s;
  }

  button span {
    color: white;
    font-size: 18px;
    transition: all 0.3s ease-in;
  }
`;

export default ButtonHeaderComponent;
