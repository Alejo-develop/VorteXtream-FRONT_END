import React from "react";
import styled from "styled-components";

interface NotificationsBoxProps{
    streamer: string;
    text: string;
    className: string
}

const NotificationBoxComponent = ({ streamer, text, className }: NotificationsBoxProps) => {
  return (
    <StyledWrapper>
      <div className={className}>
        <h3>{streamer}</h3>
        <p className="button_top">{text}</p>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  div {
    /* Variables */
    --button_radius: 0.75em;
    --button_color: #F08080; /* Updated background color */
    --button_outline_color: #2F3241; /* Updated outline color */
    font-size: 10px;
    font-weight: bold;
    text-align: center;
    padding: 7px;
    border: none;
    cursor: pointer;
    border-radius: var(--button_radius);
    color: white;
    background: var(--button_outline_color); /* Background color for div */
  }

  .button_top {
    display: block;
    box-sizing: border-box;
    border: 2px solid var(--button_outline_color); /* Border color */
    border-radius: var(--button_radius);
    padding: 0.75em 1.5em;
    background: var(--button_color); /* Background color */
    color: var(--button_outline_color); /* Text color */
    transform: translateY(-0.2em);
    transition: transform 0.1s ease;
  }

  div:hover .button_top {
    /* Pull the button upwards when hovered */
    transform: translateY(-0.33em);
    background: var(--button_outline_color); /* Background color on hover */
    color: var(--button_color); /* Text color on hover */
    border: 2px solid var(--button_color); /* Border color on hover */
  }

  button:active .button_top {
    /* Push the button downwards when pressed */
    transform: translateY(0);
  }
`;

export default NotificationBoxComponent;
