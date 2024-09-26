import { useNavigate } from "react-router-dom"; 
import styled from "styled-components"; 

interface ButtonsInterface {
  text: string; // The text to display on the button
  path: string; // The path to navigate to when the button is clicked
}

const ButtonHeaderComponent = ({ path, text }: ButtonsInterface) => {
  const goTo = useNavigate(); // Initialize the navigate function

  // Handle click event for the button
  const handleClick = () => {
    if (path === 'back') {
      goTo(-1); // Go back to the previous page if path is 'back'
    } else {
      goTo(path); // Navigate to the specified path
    }
  };

  return (
    <StyledWrapper>
      <button onClick={handleClick}> {/* Attach the click handler to the button */}
        <span>{text}</span> {/* Display the button text */}
      </button>
    </StyledWrapper>
  );
};

// Styled component for wrapping the button

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
