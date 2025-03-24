import React, { useEffect, useState } from "react";
import "./styles.css";
import WeatherCard from "../WeatherCard";
import { OpenWeatherResponse } from "../../types/openWeather";
import { CityInfo } from "../../types/cities";
import { OPEN_WEATHER_API_KEY } from "../../constants/openWeather";
import { DISPLAY_CITIES } from "../../constants/cities";

const Weathers: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [weatherData, setWeatherData] = useState<
    (OpenWeatherResponse | null)[]
  >([]);

  const fetchWeather = async () => {
    setIsLoading(true);

    try {
      const fetchCityWeather = async (city: CityInfo) => {
        try {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${OPEN_WEATHER_API_KEY}&units=metric`
          );

          if (!response.ok) {
            throw new Error(
              `Failed to fetch weather for ${city.name || "unknown city"}`
            );
          }

          return await response.json();
        } catch (error) {
          console.error((error as Error).message);
          return null;
        }
      };

      const responses = await Promise.allSettled(
        DISPLAY_CITIES.map(fetchCityWeather)
      );

      const weatherData = responses.map((res) =>
        res.status === "fulfilled" ? res.value : null
      );

      setWeatherData(weatherData);
    } catch (error) {
      console.error("Unexpected error fetching weather data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
    const interval = setInterval(fetchWeather, 600000); // 600,000 ms = 10 min
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="weathers">
      {DISPLAY_CITIES.map((city, index) => (
        <WeatherCard
          key={`${city.name.toLowerCase().replace(" ", "-")}-${index}`}
          cityInfo={city}
          weatherInfo={weatherData[index]}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
};

export default Weathers;
