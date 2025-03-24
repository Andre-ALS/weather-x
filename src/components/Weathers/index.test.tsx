import { render, screen, waitFor } from "@testing-library/react";
import Weathers from "./index";
import { DISPLAY_CITIES } from "../../constants/cities";
import { OpenWeatherResponse } from "../../types/openWeather";

const mockWeatherResponse = (temp: number): OpenWeatherResponse => ({
  coord: {
    lon: -0.1257,
    lat: 51.5085,
  },
  weather: [
    {
      id: 800,
      main: "Clear",
      description: "clear sky",
      icon: "01d",
    },
  ],
  base: "stations",
  main: {
    temp,
    feels_like: 14.0,
    temp_min: 12.0,
    temp_max: 18.0,
    pressure: 1020,
    humidity: 50,
    sea_level: 1020,
    grnd_level: 1010,
  },
  visibility: 10000,
  wind: {
    speed: 3.6,
    deg: 250,
  },
  rain: {
    "1h": 0,
  },
  clouds: {
    all: 0,
  },
  dt: 1609459200, // Example timestamp
  sys: {
    type: 1,
    id: 1414,
    country: "GB",
    sunrise: 1609444800,
    sunset: 1609496400,
  },
  timezone: 3600,
  id: 2643743,
  name: "London",
  cod: 200,
});

global.fetch = jest.fn();

describe("Weathers", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders correctly", () => {
    render(<Weathers />);

    expect(screen.getAllByTestId("weather-card-loading")).toHaveLength(
      DISPLAY_CITIES.length
    );
  });

  it("renders WeatherCard for each city", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockWeatherResponse(25)),
    });

    render(<Weathers />);

    await waitFor(() => {
      expect(screen.getAllByTestId("weather-card")).toHaveLength(
        DISPLAY_CITIES.length
      );
    });
  });

  it("handles API failures withloading state", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({ ok: false });

    render(<Weathers />);

    await waitFor(() => {
      expect(screen.getAllByTestId("weather-card-loading")).toHaveLength(
        DISPLAY_CITIES.length
      );
    });
  });
});
