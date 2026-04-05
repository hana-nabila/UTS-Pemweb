// GANTI "YOUR_API_KEY" DENGAN API KEY DARI OPENWEATHERMAP
const apiKey = "YOUR_API_KEY"; 
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherIcon = document.getElementById("weatherIcon");

async function checkWeather(city) {
    if (!city) return;

    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        
        if (response.status == 404) {
            alert("Kota tidak ditemukan. Coba cek ejaannya!");
            return;
        }

        const data = await response.json();

        // Update elemen HTML dengan data dari API
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        // Logika pergantian ikon berdasarkan kondisi cuaca
        const condition = data.weather[0].main;
        if (condition === "Clouds") {
            weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/414/414825.png";
        } else if (condition === "Clear") {
            weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/4814/4814268.png";
        } else if (condition === "Rain") {
            weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/3351/3351979.png";
        } else if (condition === "Drizzle") {
            weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/3076/3076129.png";
        } else if (condition === "Mist") {
            weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/4005/4005901.png";
        }

    } catch (error) {
        console.log("Error fetching weather data:", error);
    }
}

// Event Listener untuk klik tombol
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

// Event Listener untuk menekan tombol 'Enter'
searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});