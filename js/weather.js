const apiKey = "59c51fb5b1835f76117585cf9fdc45db";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const weatherCard = document.getElementById("weatherCard");
const loading = document.getElementById("loading");
const errorMsg = document.getElementById("errorMsg");

searchBtn.addEventListener("click", getWeather);

cityInput.addEventListener("keypress", function(e){
    if(e.key === "Enter") getWeather();
});

async function getWeather(){

    const city = cityInput.value.trim();

    if(!city){
        errorMsg.textContent = "Please enter a city name";
        return;
    }

    showLoading(true);
    errorMsg.textContent = "";

    try{

        const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );

        const data = await response.json();

        if(data.cod !== 200){
            throw new Error("City not found");
        }

        displayWeather(data);

    }catch(error){
        weatherCard.classList.add("hidden");
        errorMsg.textContent = error.message;
    }

    showLoading(false);
}

function displayWeather(data){

    document.getElementById("cityName").textContent =
        `${data.name}, ${data.sys.country}`;

    document.getElementById("temperature").textContent =
        `🌡 ${data.main.temp}°C`;

    document.getElementById("condition").textContent =
        data.weather[0].description;

    document.getElementById("humidity").textContent =
        `💧 Humidity: ${data.main.humidity}%`;

    document.getElementById("wind").textContent =
        `🌬 Wind: ${data.wind.speed} m/s`;

    document.getElementById("weatherIcon").src =
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    weatherCard.classList.remove("hidden");
}

function showLoading(state){
    loading.classList.toggle("hidden", !state);
}