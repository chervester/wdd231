// Fetch and Display Weather
async function initWeather() {
    const apiKey = "7ffe09a27f884e439f5191651250402"; // Replace with a valid OpenWeatherMap API key
    const city = "Lilongwe";
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!data.current) {
            throw new Error("Invalid weather data format");
        }

        const currentTemp = data.current.temp_c;  // Corrected temperature format
        const weatherDesc = data.current.condition.text; // Weather description
        const weatherIcon = data.current.condition.icon; // Weather icon URL

        document.getElementById("current-weather").textContent = `Temperature: ${currentTemp}°C - ${weatherDesc}`;
        document.getElementById("weather-icon").src = `https:${weatherIcon}`;
        document.getElementById("weather-icon").alt = weatherDesc;
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}
