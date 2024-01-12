// App.tsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import WeatherInfo from './componets/WeatherInfo';
import Loading from './componets/Loading';
import SearchArea from './componets/SearchArea';

interface WeatherDataProps {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  sys: {
    country: string;
  };
  weather: {
    main: string;
  }[];
  wind: {
    speed: number;
  };
}

const App: React.FC = () => {
  const api_key = "becf529db9e2c95f05c4e22d61cf8490";
  const api_Endpoint = "https://api.openweathermap.org/data/2.5/";
  const units = "metric";

  const [weatherData, setWeatherData] = useState<WeatherDataProps | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCurrentWeather = async (lat: number, lon: number) => {
    const url = `${api_Endpoint}weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=${units}`;
    const response = await axios.get(url);
    return response.data;
  };

  const fetchWeatherData = async (city: string) => {
    try {
      const url = `${api_Endpoint}weather?q=${city}&appid=${api_key}&units=${units}`;
      const searchResponse = await axios.get(url);
      const currentWeatherData: WeatherDataProps = searchResponse.data;
      return currentWeatherData;
    } catch (error) {
      console.error("No Data Found");
      throw error;
    }
  };

  const handleSearch = async (city: string) => {
    try {
      setError(null)
      const currentWeatherData = await fetchWeatherData(city);
      setWeatherData(currentWeatherData);
      setIsLoading(true);
    } catch (error: any) {
      console.error("Error fetching weather data", error);
      if (error.response && error.response.status === 404) {
        setError("City not found. Please enter a valid city name.");
      } else {
        setError("An error occurred while fetching weather data. Please try again later.");
      }

      setIsLoading(false);
    }
  };

  

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      Promise.all([fetchCurrentWeather(latitude, longitude)]).then(
        ([currentWeather]) => {
          setWeatherData(currentWeather);
          setIsLoading(true);
        }
      );
    });
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="h-screen bg-gradient-to-bl from-sky-300 to-pink-300 flex items-center justify-center">
              <div className="w-[500px] bg-white p-5 rounded-xl flex flex-col justify-around items-center bg-opacity-60 shadow-lg">
                <SearchArea onSearch={handleSearch} />
                {weatherData && isLoading ? (
                  <div>
                    <WeatherInfo
                      name={weatherData.name}
                      country={weatherData.sys.country}
                      weather={weatherData.weather[0].main}
                      temperature={weatherData.main.temp}
                      humidity={weatherData.main.humidity}
                      windSpeed={weatherData.wind.speed}
                    />
                    <Link to={`/details/${weatherData.name}`}>View More Details</Link>
                  </div>
                ) : (
                  <>
                  <Loading />
                  {error && <p className="text-red-500 mt-2">{error}</p>}
                  </>
                )}
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
