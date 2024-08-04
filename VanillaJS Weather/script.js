const API_KEY = '';//Place your api key here. This is a APi of openweather.
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

//DOM elements
const inp = document.getElementById('city-input');
const searchButton = document.getElementById('search-btn');
const cityElem = document.getElementById('city');
const degreeElem = document.getElementById('temp');
const humidityElem = document.getElementById('humidity');
const windElem = document.getElementById('wind');
const wIcon = document.getElementById('wIcon');

// Convert Kelvin to Celsius

const kelvinToCelsius = kelvinTemp => (kelvinTemp - 273.15).toFixed(0);

// Update weather icon based on weather condition
const updateWeatherIcon = (weather,iconElem) =>{
    const iconMap = {
        'Clear':'clear-sky.png',
        'Clouds':'cloud.png',
        'Rain':'rainy-day.png'
    };
    const iconFile = iconMap[weather] || 'default.png';
    iconElem.style.backgroundImage = `url("./icons/${iconFile}")`;
};

// Fetch weather data from OpenWeatherMap API


const getWeatherData = async city =>{
    try {
        const response  = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}`);
        if(!response.ok) 
            throw new Error('City not found');

        const {main:{temp,humidity}, wind:{speed:windSpeed},weather,name} = await response.json();

        degreeElem.innerText = `${kelvinToCelsius(temp)}°C`;
        humidityElem.innerText = `${humidity}%`;
        windElem.innerText = `${windSpeed} km/h`;
        cityElem.innerText = name;

        updateWeatherIcon(weather[0].main, wIcon);
    } catch (error) {
        console.log('City not found!!!');
        cityElem.innerText = 'City not found';
        degreeElem.innerText = '';
        humidityElem.innerText = '';
        windElem.innerText = '';
        wIcon.style.backgroundImage = '';
    }
}


searchButton.addEventListener('click', () => {
    const city = inp.value.trim();
    if(city)
        getWeatherData(city);
});
