let apiKey = "1e3e8f230b6064d27976e41163a82b77";
let searchinput = document.querySelector(`.searchinput`);

// Standardwert auf Pristina, die Hauptstadt des wundervollen Kosovos, setzen
searchinput.value = "Pristina";

async function search(city) {
    let url = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lang=de&q=${city}&appid=${apiKey}`);

    if (url.ok) {
        let data = await url.json();
        console.log(data);

        // Grundlegende Wetterinformationen anzeigen
        let box = document.querySelector(".return");
        box.style.display = "block";

        document.querySelector(".city-name").innerHTML = data.name;
        document.querySelector(".weather-temp").innerHTML = Math.floor(data.main.temp) + '°';

        // Bild ändern basierend auf dem Wetter
        let weatherImg = document.querySelector(".weather-img");
        if (data.weather[0].main === "Clear") {
            weatherImg.src = "img/sun.png";
        } else if (data.weather[0].main === "Clouds") {
            weatherImg.src = "img/cloud.png";
        } else if (data.weather[0].main === "Rain") {
            weatherImg.src = "img/rain.png";
        } else {
            weatherImg.src = "img/mist.png";
        }
    } else {
        // Grundlegende Fehlerbehandlung
        console.log("Ort nicht gefunden.");
    }
}

searchinput.addEventListener('keydown', function(event) {
    if (event.keyCode === 13 || event.which === 13) {
        search(searchinput.value);
        console.log("worked");
    }
});

// Suche nach Pristina bei Seitenaufruf
search("Pristina");
