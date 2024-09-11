import React from 'react';

import '../styles/selectStyle.css'

interface GenreSelectProps {
    genres: { genreId: number; genreName: string }[];
    selectedGenre: number;
    onGenreChange: (genreId: number) => void;
}

const GenreSelect: React.FC<GenreSelectProps> = ({ genres, selectedGenre, onGenreChange }) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onGenreChange(Number(event.target.value));
    };

    return (
        <div className='select-container'>
            <select value={selectedGenre} onChange={handleChange} className="genre-select">
                <option value={0}>All Genres</option>
                {genres.map((genre) => (
                    <option key={genre.genreId} value={genre.genreId}>
                        {genre.genreName}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default GenreSelect;
