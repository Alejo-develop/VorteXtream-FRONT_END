import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const WatchNowButtonComponent: React.FC = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/');
    };

    return (
        <StyledButton onClick={handleClick}>
            Watch Now
        </StyledButton>
    );
};

const StyledButton = styled.button`
    font-size: 1rem;
    padding: 10px;
    width: 190px;
    border: none;
    outline: none;
    border-radius: 0.4rem;
    cursor: pointer;
    text-transform: uppercase;
    background-color: rgb(14, 14, 26);
    color: rgb(234, 234, 234);
    margin-left: 10px;
    font-weight: 500;
    transition: 0.6s;
    box-shadow: 0px 0px 60px #1f4c65;
    -webkit-box-reflect: below 10px linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4));
    
    /* Mueve el botón hacia la izquierda */
   

  

    &:hover {
        background: linear-gradient(270deg, #F08080, #FFB6B6);
        color: rgb(4, 4, 38);
    }
`;

export default WatchNowButtonComponent;
