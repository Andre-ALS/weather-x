import React from "react";
import "./styles.css";
import { OpenWeatherResponse } from "../../types/openWeather";
import { CityInfo } from "../../types/cities";
import Skeleton from "../Skeleton";

const Humidity = require("../../assets/misc/Humidity.png");
const Pressure = require("../../assets/misc/Pressure.png");
const Wind = require("../../assets/misc/Wind.png");

interface WeatherCardProps {
  cityInfo: CityInfo;
  weatherInfo: OpenWeatherResponse | null;
  isLoading: boolean;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  cityInfo,
  weatherInfo,
  isLoading,
}) => {
  const getTempLevel = () => {
    if (!weatherInfo) return "temp-medium"; // Handle missing weather info
    const temp = parseInt(weatherInfo.main.temp.toFixed(0));
    if (temp <= 5) {
      return "temp-low";
    } else if (temp <= 25) {
      return "temp-medium";
    }
    return "temp-high";
  };

  if (!weatherInfo || isLoading) {
    return (
      <article data-testid="weather-card-loading" className="weather-card">
        <header className="weather-card__header">
          <Skeleton height={24} width={200} />
          <Skeleton height={16} width={200} />
        </header>
        <Skeleton height={150} width={620} borderRadius={12} />
      </article>
    );
  }

  return (
    <article data-testid="weather-card" className="weather-card">
      <header className="weather-card__header">
        <h4>{cityInfo.name.toUpperCase()}</h4>
        <p>{`${cityInfo.state} - ${cityInfo.country}`}</p>
      </header>
      <section
        data-testid="weather-card-background"
        className={`weather-card__content ${getTempLevel()}`}
      >
        <figure className="weather-details">
          <figcaption className="weather-icon">
            <img
              src={`http://openweathermap.org/img/wn/${
                weatherInfo.weather[0].icon || "01d"
              }@4x.png`}
              alt="Weather Icon"
            />
          </figcaption>
          <div className="weather-card__temperature">
            <span>{weatherInfo.main.temp.toFixed(0)}</span>
            <span>ºC</span>
          </div>
          <section className="weather-card__info">
            <div className="weather-card__info-row">
              <img src={Humidity} alt="humidity-icon" height={20} width={20} />
              <span>{weatherInfo.main.humidity}% Humidity</span>
            </div>
            <div className="weather-card__info-row">
              <img src={Pressure} alt="pressure-icon" height={20} width={20} />
              <span>{weatherInfo.main.pressure} hPa</span>
            </div>
            <div className="weather-card__info-row">
              <img src={Wind} alt="wind-icon" height={20} width={20} />
              <span>{weatherInfo.wind.speed} meter/sec</span>
            </div>
          </section>
        </figure>
      </section>
    </article>
  );
};

export default WeatherCard;
