import React from 'react';
import WeatherForm from './WeatherForm';

interface SearchAreaProps {
    onSearch: (city: string) => void;
}

const SearchArea: React.FC<SearchAreaProps> = ({ onSearch }) => {
    return (
    <WeatherForm onSubmit={onSearch} />
    );
};

export default SearchArea;
