
const cityInput = document.getElementById("cityInput");
const searchButton = document.getElementById("searchButton");
const errorMessage = document.getElementById("errorMessage");
const loading = document.getElementById("loading");
const weatherData = document.getElementById("weatherData");
const cityName = document.getElementById("cityName");
const dateTime = document.getElementById("dateTime");
const weatherIcon = document.getElementById("weatherIcon");
const temperature = document.getElementById("temperature");
const weatherDescription = document.getElementById("weatherDescription");
const feelsLike = document.getElementById("feelsLike");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const pressure = document.getElementById("pressure");
const visibility = document.getElementById("visibility");
const forecastContainer = document.getElementById("forecastContainer");
const celsiusBtn = document.getElementById("celsiusBtn");
const fahrenheitBtn = document.getElementById("fahrenheitBtn");

// API Configuration
const API_KEY = "eccdc0ae12934b73ce9b185568da4d91";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// State
let currentUnit = "metric";
let currentWeatherData = null;

// Event Listeners
searchButton.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) fetchWeatherData(city);
});

cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const city = cityInput.value.trim();
    if (city) fetchWeatherData(city);
  }
});

celsiusBtn.addEventListener("click", () => {
  if (currentUnit !== "metric") {
    currentUnit = "metric";
    celsiusBtn.classList.add("active");
    fahrenheitBtn.classList.remove("active");
    convertTemperatures();
  }
});

fahrenheitBtn.addEventListener("click", () => {
  if (currentUnit !== "imperial") {
    currentUnit = "imperial";
    fahrenheitBtn.classList.add("active");
    celsiusBtn.classList.remove("active");
    convertTemperatures();
  }
});

// Fetch weather data from OpenWeatherMap API
async function fetchWeatherData(city) {
  loading.style.display = "block";
  weatherData.style.display = "none";
  errorMessage.style.display = "none";

  try {
    // Current weather
    const currentRes = await fetch(
      `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    const currentData = await currentRes.json();

    if (currentRes.status === 401) throw new Error("Invalid API key");
    if (currentRes.status === 404) throw new Error("City not found");

    // 5-day forecast
    const forecastRes = await fetch(
      `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );
    const forecastData = await forecastRes.json();

    if (forecastRes.status === 401) throw new Error("Invalid API key");
    if (forecastRes.status === 404) throw new Error("Forecast not found");

    // Take 1 data point per day (every 8 items ~ 24h)
    const forecast = forecastData.list.filter((_, i) => i % 8 === 0);

    currentWeatherData = { ...currentData, forecast };
    currentUnit === "metric" ? displayWeatherData(currentWeatherData) : convertTemperatures();
  } catch (error) {
    showError(error.message);
  }
}

// Display weather data
function displayWeatherData(data) {
  const { name, main, weather, wind, visibility: vis, sys, dt, forecast } = data;
  const currentWeather = weather[0];

  cityName.textContent = `${name}, ${sys.country}`;
  dateTime.textContent = formatDate(new Date(dt * 1000));
  weatherIcon.className = getWeatherIcon(currentWeather.id);

  temperature.textContent = formatTemp(main.temp);
  weatherDescription.textContent = currentWeather.description;
  feelsLike.textContent = formatTemp(main.feels_like);
  humidity.textContent = `${main.humidity}%`;
  windSpeed.textContent = `${wind.speed} ${currentUnit === "metric" ? "m/s" : "mph"}`;
  pressure.textContent = `${main.pressure} hPa`;
  visibility.textContent = `${(vis / 1000).toFixed(1)} km`;

  updateForecast(forecast);

  loading.style.display = "none";
  weatherData.style.display = "block";
}

// Convert temperatures locally when unit changes
function convertTemperatures() {
  if (!currentWeatherData) return;

  const convert = (temp) =>
    currentUnit === "metric" ? Math.round((temp - 32) * (5 / 9)) : Math.round(temp * (9 / 5) + 32);

  const main = currentWeatherData.main;
  const forecast = currentWeatherData.forecast;

  const temp = currentUnit === "metric" ? main.temp : main.temp * 9 / 5 + 32;
  const feels = currentUnit === "metric" ? main.feels_like : main.feels_like * 9 / 5 + 32;

  temperature.textContent = formatTemp(temp);
  feelsLike.textContent = formatTemp(feels);

  // Convert forecast temps
  forecast.forEach((day) => {
    day.main.temp = currentUnit === "metric"
      ? (day.main.temp - 32) * (5 / 9)
      : day.main.temp * (9 / 5) + 32;
  });

  displayWeatherData(currentWeatherData);
}

// Update forecast section
function updateForecast(forecastData) {
  forecastContainer.innerHTML = "";

  forecastData.forEach((day) => {
    const { dt, main, weather } = day;
    const forecastDate = new Date(dt * 1000);
    const dayName = forecastDate.toLocaleDateString("en-US", { weekday: "short" });
    const weatherCondition = weather[0];

    const forecastCard = document.createElement("div");
    forecastCard.className = "forecast-card";
    forecastCard.innerHTML = `
      <div class="forecast-day">${dayName}</div>
      <div class="forecast-date">${forecastDate.getDate()}/${forecastDate.getMonth() + 1}</div>
      <div class="forecast-icon"><i class="${getWeatherIcon(weatherCondition.id)}"></i></div>
      <div class="forecast-temp">${formatTemp(main.temp)}</div>
      <div class="forecast-description">${weatherCondition.description}</div>
    `;
    forecastContainer.appendChild(forecastCard);
  });
}

// Convert numeric temp to string with °C or °F
function formatTemp(temp) {
  return `${Math.round(temp)}°${currentUnit === "metric" ? "C" : "F"}`;
}

// Convert date to readable format
function formatDate(date) {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Weather icon mapping
function getWeatherIcon(code) {
  if (code >= 200 && code < 300) return "fas fa-bolt";
  if (code >= 300 && code < 400) return "fas fa-cloud-rain";
  if (code >= 500 && code < 600) return "fas fa-cloud-showers-heavy";
  if (code >= 600 && code < 700) return "fas fa-snowflake";
  if (code >= 700 && code < 800) return "fas fa-smog";
  if (code === 800) return "fas fa-sun";
  if (code > 800) return "fas fa-cloud";
  return "fas fa-cloud";
}

// Show error
function showError(message) {
  loading.style.display = "none";
  weatherData.style.display = "none";
  errorMessage.textContent = message;
  errorMessage.style.display = "block";
}

// Initialize with default city
window.addEventListener("load", () => {
  fetchWeatherData("New York");
});
