import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

interface WeatherFormProps {
    onSubmit: (city: string) => void;
}

const WeatherForm: React.FC<WeatherFormProps> = ({ onSubmit }) => {
    const [city, setCity] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim() !== '') {
        onSubmit(city);
    }
    };

    return (
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
    );
};

export default WeatherForm;
