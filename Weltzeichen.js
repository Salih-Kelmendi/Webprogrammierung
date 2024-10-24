let apiKey = "1e3e8f230b6064d27976e41163a82b77";
let searchinput = document.querySelector(".searchinput");

// Wetterinfo
async function city(cityName) {
  let url = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityName}&appid=${apiKey}`
  );
  if (url.ok) {
    let data = await url.json();
    console.log(data);

    // Wetterdaten anzeigen
    document.querySelector(".city-name").innerHTML = data.name;
    document.querySelector(".weather-temp").innerHTML =
      Math.floor(data.main.temp) + "°";

    let weatherImg = document.querySelector(".weather");

    // Wettericon basierend auf den Bedingungen ändern
    if (data.weather[0].main === "Rain") {
      weatherImg.src = "img/rain.png";
    } else if (data.weather[0].main === "Clear") {
      weatherImg.src = "img/sun.png";
    } else if (data.weather[0].main === "Snow") {
      weatherImg.src = "img/snow.png";
    } else if (data.weather[0].main === "Clouds" || data.weather[0].main === "Smoke") {
      weatherImg.src = "img/cloud.png";
    } else if (data.weather[0].main === "Mist" || data.weather[0].main === "Fog") {
      weatherImg.src = "img/mist.png";
    } else if (data.weather[0].main === "Haze") {
      weatherImg.src = "img/haze.png";
    }

    return true;
  } else {
    return false;
  }
}

// Ereignis für die Suche mit der Eingabetaste
searchinput.addEventListener("keydown", async function (event) {
  if (event.keyCode === 13 || event.which === 13) {
    const weatherInfo = await city(searchinput.value);
    if (weatherInfo) {
      document.querySelector(".error-message").style.display = "none";
      document.querySelector(".normal-message").style.display = "block";
    } else {
      document.querySelector(".error-message").style.display = "block";
      document.querySelector(".normal-message").style.display = "none";
    }
  }
});

// Aufrufen der Funktion mit Standardstädten
city("Berlin");
city("München");
city("Frankfurt");
