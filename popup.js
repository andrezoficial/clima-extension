const searchBtn = document.getElementById('search-btn');
const geoBtn = document.getElementById('geo-btn');
const cityInput = document.getElementById('city-input');
const resultDiv = document.getElementById('weather-result');

searchBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (!city) {
    resultDiv.textContent = "Por favor ingresa una ciudad.";
    return;
  }
  fetchWeatherByCity(city);
});

geoBtn.addEventListener('click', () => {
  if (!navigator.geolocation) {
    resultDiv.textContent = "Geolocalización no soportada.";
    return;
  }

  resultDiv.textContent = "Obteniendo ubicación...";
  navigator.geolocation.getCurrentPosition(async (pos) => {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;
    fetchWeatherByCoords(lat, lon);
  }, (error) => {
    resultDiv.textContent = `Error al obtener ubicación: ${error.message}`;
  });
});

async function fetchWeatherByCity(city) {
  resultDiv.textContent = "Cargando...";
  try {
    const resp = await fetch(`https://clima-api-17w0.onrender.com/clima?ciudad=${encodeURIComponent(city)}`);
    if (!resp.ok) throw new Error("Ciudad no encontrada");
    const data = await resp.json();
    displayWeather(data);
  } catch (err) {
    resultDiv.textContent = `Error: ${err.message}`;
  }
}

async function fetchWeatherByCoords(lat, lon) {
  resultDiv.textContent = "Cargando...";
  try {
    const resp = await fetch(`https://clima-api-17w0.onrender.com/clima?lat=${lat}&lon=${lon}`);
    if (!resp.ok) throw new Error("No se pudo obtener el clima");
    const data = await resp.json();
    displayWeather(data);
  } catch (err) {
    resultDiv.textContent = `Error: ${err.message}`;
  }
}

function displayWeather(data) {
  resultDiv.innerHTML = `
    <h3>${data.ciudad}</h3>
    <p>🌡️ Temperatura: ${data.temperatura}°C</p>
    <p>💧 Humedad: ${data.humedad}%</p>
    <p>🌥️ Clima: ${data.clima}</p>
  `;
}
