// InformationPage.tsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import WeatherInfo from '../componets/WeatherInfo'; 

interface InformationPageProps {
  wheatherData: any;
  isLoading: boolean;
  error: string | null;
}

interface WeatherDataProps {
  name: string;
  sys: {
    country: string;
  };
  weather: {
    main: string;
  }[];
  main: {
    temp: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
}

const InformationPage: React.FC<InformationPageProps> = ({ isLoading, error }) => {
  const location = useLocation();
  const cityName = new URLSearchParams(location.search).get('city') || '';

  const [weatherData, setWeatherData] = useState<WeatherDataProps | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const apiKey = 'becf529db9e2c95f05c4e22d61cf8490';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${apiKey}&units=metric`;
        
        const response = await axios.get(apiUrl);
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching weather data', error);
        // Handle errors appropriately
      }
    };

    if (cityName) {
      fetchWeatherData();
    }
  }, [cityName]);

  return (
    <div className="h-screen bg-gradient-to-bl from-sky-300 to-pink-300 flex items-center justify-center">
      <div className="w-[500px] bg-white p-5 rounded-xl flex flex-col justify-around items-center bg-opacity-60 shadow-lg">
        {weatherData && !isLoading ? (
          <WeatherInfo
            name={weatherData.name}
            country={weatherData.sys.country}
            weather={weatherData.weather[0].main}
            temperature={weatherData.main.temp}
            humidity={weatherData.main.humidity}
            windSpeed={weatherData.wind.speed}
          />
        ) : (
          <>
            {isLoading && <p>Loading...</p>}
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </>
        )}
      </div>
    </div>
  );
};

export default InformationPage;
