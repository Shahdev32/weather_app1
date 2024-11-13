import React, { useEffect, useState } from 'react';
import { FaSearchLocation } from "react-icons/fa";
import { BiWind } from 'react-icons/bi';
import { LuWaves } from "react-icons/lu";
import { HiSun } from "react-icons/hi";
import { PiCloudSunFill } from "react-icons/pi"; // Ensure this is the correct import

const API = "d95b538f61a50daca43b2770a443d44b";

function WeatherCard() {
    const [city, setCity] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    const [search, setSearch] = useState(false);

    const fetchWeatherData = async () => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}`);
            const data = await response.json();
            setWeatherData(data);
            setSearch(false);
            console.log(data);
        } catch (err) {
            console.log("Error fetching weather data", err);
            setWeatherData(null);
        }
    };

    useEffect(() => {
        if (city && search) {
            fetchWeatherData();
        }
    }, [city, search]);

    return (
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 mt-10 p-4 rounded-lg">
            <div className="flex items-center">
                <input 
                    type="text"
                    placeholder="Enter city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="p-2 border rounded w-full"
                />
                <button 
                    onClick={() => setSearch(true)}
                    className="ml-2 p-2 bg-blue-500 text-white rounded"
                >
                    <FaSearchLocation />
                </button>
            </div>
            {weatherData && (
                <div className="mt-4 text-white">
                    <h2 className="text-2xl font-semibold">{weatherData.name}</h2>
                    <p>{weatherData.weather[0].description}</p>
                    <p className="flex items-center"><BiWind className="mr-1" /> Wind Speed: {weatherData.wind.speed} m/s</p>
                    <p className="flex items-center"><HiSun className="mr-1" /> Temperature: {(weatherData.main.temp - 273.15).toFixed(2)}°C</p>
                    <p className="flex items-center"><LuWaves className="mr-1" /> Humidity: {weatherData.main.humidity}%</p>
                    <p className="flex items-center"><PiCloudSunFill className="mr-1" /> Clouds: {weatherData.clouds.all}%</p>
                </div>
            )}
        </div>
    );
}

export default WeatherCard;
