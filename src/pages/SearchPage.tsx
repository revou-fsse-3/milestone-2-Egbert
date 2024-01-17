// SearchPage.tsx
import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

interface SearchPageProps {
    onSearch: (city: string) => void;
}

const SearchPage: React.FC<SearchPageProps> = ({ onSearch }) => {
    const [city, setCity] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (city.trim() !== '') {
        onSearch(city);
        navigate(`/information?city=${encodeURIComponent(city)}`);
        }
    };

    return (
    <div className="h-screen bg-gradient-to-bl from-sky-300 to-pink-300 flex items-center justify-center">
        <div className="w-[500px] bg-white p-5 rounded-xl flex flex-col justify-around items-center bg-opacity-60 shadow-lg">
            <form className="searchArea mt-8 flex justify-around items-center w-full" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter a City"
                className="outline-none border border-gray-400 p-2 rounded-full text-center w-80 bg-transparent"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <button type="submit" className="border border-gray-400 w-12 h-12 rounded-full flex justify-center items-center cursor-pointer">
                <AiOutlineSearch className="searchIcon text-gray-500" />
            </button>
            </form>
        </div>
        </div>
    );
};

export { SearchPage };