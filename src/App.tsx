// App.tsx
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import { SearchPage } from './pages/SearchPage';
import InformationPage from './pages/InformationPage';

const App = () => {
  const [weatherData, setWeatherData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (city: string) => {
    try {
      setError(null);
      setIsLoading(true);

      const apiKey = 'becf529db9e2c95f05c4e22d61cf8490';
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

      const response = await axios.get(apiUrl);
      setWeatherData(response.data);
    } catch (error: any) {
      console.error('Error fetching weather data', error);
      if (error.response && error.response.status === 404) {
        setError('City not found. Please enter a valid city name.');
      } else {
        setError('An error occurred while fetching weather data. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<SearchPage onSearch={handleSearch} />}
        />
        <Route
          path="/information"
          element={<InformationPage wheatherData={undefined} {...{ weatherData, isLoading, error }} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
