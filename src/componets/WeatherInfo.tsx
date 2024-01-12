import React from 'react';
import { WiHumidity } from 'react-icons/wi';
import { SiWindicss } from 'react-icons/si';
import { BsFillSunFill, BsCloudFill, BsFillCloudRainFill, BsFillCloudFog2Fill } from 'react-icons/bs';
import { TiWeatherPartlySunny } from 'react-icons/ti';

interface WeatherInfoProps {
    name: string;
    country: string;
    weather: string;
    temperature: number;
    humidity: number;
    windSpeed: number;
}

const WeatherInfo: React.FC<WeatherInfoProps> = ({
    name,
    country,
    weather,
    temperature,
    humidity,
    windSpeed,
}) => {
    const iconChanger = (weatherType: string) => {
    let iconElement: React.ReactNode;
    let iconColor: string;

    switch (weatherType) {
        case 'Rain':
        iconElement = <BsFillCloudRainFill />;
        iconColor = '#272629';
        break;
        case 'Clear':
        iconElement = <BsFillSunFill />;
        iconColor = '#FFC436';
        break;
        case 'Clouds':
        iconElement = <BsCloudFill />;
        iconColor = '#102C57';
        break;
        case 'Mist':
        iconElement = <BsFillCloudFog2Fill />;
        iconColor = '#279EFF';
        break;
        default:
        iconElement = <TiWeatherPartlySunny />;
        iconColor = '#7B2869';
    }

    return (
        <span className="icon" style={{ color: iconColor }}>
        {iconElement}
        </span>
    );
    };

    return (
    <div className="weatherArea mt-8 flex flex-col items-center">
        <h1 className="text-4xl font-bold">{name}</h1>
        <span className="mb-2">{country}</span>
        <div className="icon text-8xl">{iconChanger(weather)}</div>
        <h1 className="text-6xl">{temperature.toFixed(0)}</h1>
        <h2 className="text-2xl font-semibold">{weather}</h2>

        <div className="mt-8 font-serif bg-white rounded-xl flex justify-around items-center bg-opacity-40">
        <div className="humidityLevel flex items-center mx-4">
            <WiHumidity className="windIcon text-6xl" />
            <div>
            <h1 className="text-4xl font-bold">{humidity}%</h1>
            <p>Humidity</p>
            </div>
        </div>

        <div className="flex items-center mx-4">
            <SiWindicss className="windIcon text-5xl mr-2" />
            <div>
            <h1 className="text-4xl font-bold">{windSpeed}km/h</h1>
            <p>Wind Speed</p>
            </div>
        </div>
        </div>
    </div>
    );
};

export default WeatherInfo