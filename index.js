let apiKey = "1e3e8f230b6064d27976e41163a82b77";

async function fetchWeatherData(lat, lon) {
    try {
        let map = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${apiKey}`);
        let userdata = await map.json();
        let loc = userdata[0].name;
        let url = `https://api.openweathermap.org/data/2.5/weather?units=metric&lang=de&q=${loc}&appid=${apiKey}`;
        let respond = await fetch(url);
        let data = await respond.json();

        // Wetterdaten in der Konsole anzeigen
        console.log(data);

        let cityMain = document.getElementById("city-name");
        let cityTemp = document.getElementById("metric");
        let weatherMain = document.getElementById("weather-main");
        let mainHumidity = document.getElementById("humidity");
        let mainFeel = document.getElementById("feels-like");
        let weatherImg = document.querySelector(".weather-icon");

        // Grundlegende Wetterdaten anzeigen
        cityMain.innerHTML = data.name;
        cityTemp.innerHTML = Math.floor(data.main.temp) + "°C";
        weatherMain.innerHTML = data.weather[0].description;
        mainHumidity.innerHTML = Math.floor(data.main.humidity) + "%";
        mainFeel.innerHTML = Math.floor(data.main.feels_like) + "°C";

        // Wettericons basierend auf den Hauptwetterbedingungen ändern
        let weatherCondition = data.weather[0].main.toLowerCase();

        if (weatherCondition === "rain") {
            weatherImg.src = "img/rain.png";
        } else if (weatherCondition === "clear") {
            weatherImg.src = "img/sun.png";
        } else if (weatherCondition === "snow") {
            weatherImg.src = "img/snow.png";
        } else if (weatherCondition === "clouds") {
            weatherImg.src = "img/cloud.png";
        } else {
            weatherImg.src = "img/mist.png";
        }
    } catch (error) {
        console.error("Fehler beim Abrufen der Wetterdaten:", error);
    }
}

// Geolocation API zur Abfrage des Standorts des Nutzers verwenden
if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            fetchWeatherData(lat, lon);
        },
        (error) => {
            console.error("Fehler bei der Standortabfrage:", error);
            // Standardwert auf Pristina setzen, wenn die Standortabfrage fehlschlägt
            fetchWeatherData(42.6629, 21.1655);
        }
    );
} else {
    console.error("Geolocation wird nicht unterstützt.");
    // Standardwert auf Pristina setzen, wenn Geolocation nicht unterstützt wird
    fetchWeatherData(42.6629, 21.1655);
}
