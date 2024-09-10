import styled from "styled-components";

const ButtonWatch = () => {
  return (
    <StyledWrapper>
      <button className="btn">Watch</button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .btn {
    font-size: 1.2rem;
    padding: 0.8rem 1.5rem;
    width: auto;
    border: none;
    outline: none;
    border-radius: 0.4rem;
    cursor: pointer;
    text-transform: uppercase;
    background-color: rgb(14, 14, 26);
    color: rgb(234, 234, 234);
    font-weight: 700;
    transition: 0.6s;
    box-shadow: 0px 0px 60px #1f4c65;
    -webkit-box-reflect: below 10px linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4));
  }

  .btn:active {
    scale: 0.92;
  }

  .btn:hover {
    background: linear-gradient(270deg, #F08080, #FFB6B6);
    color: rgb(4, 4, 38);
  }
`;

export default ButtonWatch;
