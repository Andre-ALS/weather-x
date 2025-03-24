# Weather X

This project is a weather application built with React that displays the temperature, humidity, and pressure for three cities: Urubici - SC, Joinville - SC, and San Francisco - CA. It fetches real-time weather data from an API and allows you to easily extend the list of cities in the future.

## Project Setup

To get started with this project, make sure you have **Node.js** and **npm** installed on your machine.

1. Clone the repository:

   ```bash
   git clone https://github.com/Andre-ALS/weather-x.git
   cd weather-x
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Run the app in development mode:

   ```bash
   npm start
   ```

   This will start the app and open it in your default browser at [http://localhost:3000](http://localhost:3000). The page will reload automatically if you make any edits, and any lint errors will be shown in the console.

## Available Scripts

In the project directory, you can run the following commands:

### `npm start`

Runs the app in development mode.

### `npm test`

Launches the test runner in interactive watch mode. For more details, check out the [React testing documentation](https://reactjs.org/docs/testing.html).

### `npm run build`

Builds the app for production to the `build` folder. This creates a minified and optimized version of the app for the best performance.

### `npm run eject`

**Note:** This is a one-way operation. Once you eject, you can't go back. This will expose all the configuration files (webpack, Babel, ESLint, etc.) so you can modify them if needed. It's recommended only if you need more control over the project setup.

## Adding More Cities

To extend the application with more cities, you will need to:

1. To add more cities, go to src\constants\cities.ts. and add it to the **DISPLAY_CITIES** array.
2. Ensure the UI is updated to handle the new cities and their data.
3. Optionally, you can customize the display and add more features like city search or dynamic location fetching.

## Insights

- The application is designed to be lightweight and easy to extend with minimal effort.
- It's a simple, fast way to display live weather data for selected cities.
- As it uses React, you can easily modify the UI or add more features as needed.
