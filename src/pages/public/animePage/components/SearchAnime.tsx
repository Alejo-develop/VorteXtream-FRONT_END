import React, { useState } from "react";
import styled from "styled-components";

interface SearchAnimeProps {
  onSearch: (query: string) => void;
}

const SearchAnime: React.FC<SearchAnimeProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    onSearch(event.target.value); // Llamar a la función de búsqueda al mismo tiempo
  };

  return (
    <StyledWrapper>
      <form>
        <div className="group">
          <svg className="icon" aria-hidden="true" viewBox="0 0 24 24">
            <g>
              <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z" />
            </g>
          </svg>
          <input 
            placeholder="Search Your Favorite Anime" 
            type="search" 
            className="input" 
            value={query}
            onChange={handleChange}
          />
        </div>
      </form>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .group {
    display: flex;
    line-height: 28px;
    align-items: center;
    position: relative;
    width: 100%;
   
  }

  .input {
    width: 130%;
    height: 40px;
    line-height: 28px;
    padding: 1.5rem 10rem ; 
    padding-left: 2.8rem;
    border: 2px solid transparent;
    border-radius: 25px;
    outline: none;
    background-color: #000;
    color: #ffff;
    transition: .3s ease;
    font-size: 1.rem
  }

  .input::placeholder {
    color: #9e9ea7;
  }

  .input:focus, .input:hover {
    outline: none;
  }

  .icon {
    position: absolute;
    left: 1rem;
    fill: #9e9ea7;
    width: 1rem;
    height: 1rem;
  }
`;

export default SearchAnime;
