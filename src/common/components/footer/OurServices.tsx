import styled from "styled-components";

const OurServicesComponent = () => {
  return (
    <StyledWrapper>
      <div className="menu">
        <div className="item">
          <a href="#" className="link">
            <span className="main-link">
              <span className="our-text">Our Services</span> 
            </span>
          </a>
          <div className="submenu">
            <div className="submenu-item">
              <a href="#" className="submenu-link">Streamings</a>
            </div>
            <div className="submenu-item">
              <a href="#" className="submenu-link">Anime</a>
            </div>
            <div className="submenu-item">
              <a href="#" className="submenu-link">Movies</a>
            </div>
            <div className="submenu-item">
              <a href="#" className="submenu-link">Series</a>
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .menu {
    font-size: 16px;
    line-height: 1.6;
    width: fit-content;
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .menu a {
    text-decoration: none;
    color: inherit;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    color: #FFF;
  }

  .menu .link {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 12px 36px;
    border-radius: 16px;
    overflow: hidden;
    background-color: transparent;
    color: #333; 
    transition: all 0.3s ease-in-out;
  }

  .our-text {
    color: #F08080;
    font-size: 1.6rem;
  }

  .menu .link::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #F08080;
    z-index: -1;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease-in-out;
  }

  .menu .link svg {
    width: 14px;
    height: 14px;
    fill: #333;
    transition: all 0.3s ease-in-out;
  }

  .menu .item {
    position: relative;
  }

  .menu .item .submenu {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    overflow: hidden;
    background-color: transparent;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-12px);
    transition: all 0.3s ease-in-out;
    z-index: 1;
    pointer-events: none;
  }

  .menu .item:hover .submenu {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
    pointer-events: auto;
  }

  .menu .item:hover .link {
    background-color: #2f3233; /* Color de fondo cuando se hace hover */
    color: #F08080; /* Color del texto cuando se hace hover */
  }

  .menu .item:hover .link::after {
    transform: scaleX(1);
    transform-origin: right;
  }

  .menu .item:hover .link svg {
    fill: #F08080; /* Cambiar también el color del ícono en hover */
    transform: rotate(-180deg);
  }

  .submenu .submenu-item {
    width: 100%;
    transition: all 0.3s ease-in-out;
  }

  .submenu .submenu-link {
    display: block;
    padding: 12px 24px;
    width: 100%;
    position: relative;
    text-align: center;
    color: #FFF;
    transition: all 0.3s ease-in-out;
    border-bottom: 1px solid #e0e0e0;
  }

  .submenu .submenu-link::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    transform: scaleX(0);
    width: 100%;
    height: 100%;
    background-color: #ff858577;
    z-index: -1;
    transform-origin: left;
    transition: transform 0.3s ease-in-out;
  }

  .submenu .submenu-link:hover:before {
    transform: scaleX(1);
    transform-origin: right;
  }

  .submenu .submenu-link:hover {
    color: #ffffff;
    background-color: #f08080ab;
  }

  .main-link {
    font-size: 20px;
    font-weight: bold;
  }
`;

export default OurServicesComponent;
