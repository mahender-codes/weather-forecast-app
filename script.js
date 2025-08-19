const apiKey = "04bd1f8cf26fd3bc6e3d83839c8a7b7f";

// Get references to elements
const searchBtn = document.querySelector("button");
const cityInput = document.getElementById("cityInput");

const cityDisplay = document.getElementById("city");
const descDisplay = document.getElementById("desc");
const tempValue = document.getElementById("value");
const weatherIcon = document.querySelector("#details img"); // icon image

// Event listener for button
searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city !== "") {
        fetchWeather(city);
    } else {
        alert("Please enter a city name.");
    }
});

// Function to fetch and display weather
async function fetchWeather(city) {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === 200) {
            // Extract info 
            const cityName = data.name;
            const country = data.sys.country;
            const temp = data.main.temp;
            const description = data.weather[0].description;
            const iconCode = data.weather[0].icon;

            // Update DOM
            cityDisplay.innerHTML = `<h4>${cityName},</h4><h4>${country}</h4>`;
            descDisplay.textContent = description;
            tempValue.textContent = temp;
            weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
            weatherIcon.alt = description;
        } else {
            alert("City not found. Please try again.");
        }

    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("Something went wrong. Please try again later.");
    }
}
