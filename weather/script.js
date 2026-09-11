const apiKey = "b1e5eb742a050675035e7f7844ed9732";
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");

// Fetch weather by city name
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) getWeatherByCity(city);
});

// Fetch weather by current location on load
window.onload = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        getWeatherByLocation(latitude, longitude);
      },
      () => alert("Location access denied. Please enter a city name.")
    );
  }
};

// Get weather by city
async function getWeatherByCity(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.cod === 200) {
    updateCurrentWeather(data);
    getForecast(data.coord.lat, data.coord.lon);
  } else {
    alert("City not found!");
  }
}

// Get weather by coordinates
async function getWeatherByLocation(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  updateCurrentWeather(data);
  getForecast(lat, lon);
}

// Update current weather display
function updateCurrentWeather(data) {
  document.getElementById(
    "location"
  ).textContent = `${data.name}, ${data.sys.country}`;
  document.getElementById("date").textContent = new Date().toLocaleString();
  document.getElementById("temperature").textContent = `${Math.round(
    data.main.temp
  )}°C`;
  document.getElementById("condition").textContent =
    data.weather[0].description;
  document.getElementById("humidity").textContent = `${data.main.humidity}%`;
  document.getElementById("wind").textContent = `${data.wind.speed} km/h`;
}

// Get 5-day forecast
async function getForecast(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  const res = await fetch(url);
  const data = await res.json();

  const forecastContainer = document.getElementById("forecastContainer");
  forecastContainer.innerHTML = "";

  // Filter forecast to one entry per day (every 24h)
  const daily = data.list.filter((item) => item.dt_txt.includes("12:00:00"));

  daily.forEach((day) => {
    const date = new Date(day.dt_txt).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
    const card = `
      <div class="forecast-card">
        <h4>${date}</h4>
        <img src="https://openweathermap.org/img/wn/${
          day.weather[0].icon
        }.png" alt="">
        <p>${Math.round(day.main.temp)}°C</p>
        <p>${day.weather[0].main}</p>
      </div>`;
    forecastContainer.insertAdjacentHTML("beforeend", card);
  });
}