import { render, screen, waitFor } from "@testing-library/react";
import WeatherCard from "./index";
import { OpenWeatherResponse } from "../../types/openWeather";
import { CityInfo } from "../../types/cities";

jest.mock("../Skeleton", () => {
  return function MockSkeleton(props: { height: number; width: number }) {
    return (
      <div
        data-testid="skeleton"
        style={{ height: props.height, width: props.width }}
      />
    );
  };
});

const mockCity: CityInfo = {
  name: "New York",
  state: "NY",
  country: "US",
  lat: 40.7128,
  lon: -74.006,
};

const mockWeather = {
  weather: [{ icon: "01d", description: "clear sky", main: "Clear" }],
  main: { temp: 15, humidity: 50, pressure: 1012 },
  wind: { speed: 5 },
  sys: { country: "US" },
  name: "New York",
} as OpenWeatherResponse;

describe("WeatherCard", () => {
  it("renders loading state when isLoading is true", async () => {
    render(
      <WeatherCard cityInfo={mockCity} weatherInfo={null} isLoading={true} />
    );

    expect(screen.getByTestId("weather-card-loading")).toBeInTheDocument();
    expect(screen.getAllByTestId("skeleton").length).toBeGreaterThan(0);
  });

  it("renders city name, state, and country correctly", () => {
    render(
      <WeatherCard
        cityInfo={mockCity}
        weatherInfo={mockWeather}
        isLoading={false}
      />
    );

    expect(screen.getByText("NEW YORK")).toBeInTheDocument();
    expect(screen.getByText("NY - US")).toBeInTheDocument();
  });

  it("displays the correct temperature and classification", async () => {
    render(
      <WeatherCard
        cityInfo={mockCity}
        weatherInfo={mockWeather}
        isLoading={false}
      />
    );

    expect(screen.getByText("15")).toBeInTheDocument();
    expect(screen.getByText("ºC")).toBeInTheDocument();

    const mainContainer = screen.getByTestId("weather-card-background");

    await waitFor(() => {
      expect(mainContainer.classList.contains("temp-medium")).toBe(true);
    });
  });

  it("displays humidity, pressure, and wind speed correctly", () => {
    render(
      <WeatherCard
        cityInfo={mockCity}
        weatherInfo={mockWeather}
        isLoading={false}
      />
    );

    expect(screen.getByText("50% Humidity")).toBeInTheDocument();
    expect(screen.getByText("1012 hPa")).toBeInTheDocument();
    expect(screen.getByText("5 meter/sec")).toBeInTheDocument();
  });

  it("renders fallback UI if weatherInfo is missing", () => {
    render(
      <WeatherCard cityInfo={mockCity} weatherInfo={null} isLoading={false} />
    );

    expect(screen.getByTestId("weather-card-loading")).toBeInTheDocument();
  });
});
