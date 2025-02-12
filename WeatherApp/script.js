const apiKey = '50796161f18c7e22b785cf919116e256';

window.onload = function () {
    getWeather('Bengaluru');
};

document.getElementById('searchBtn').addEventListener('click', () => {
    const city = document.getElementById('cityInput').value;
    if (city) {
        getWeather(city);
    }
});

async function getWeather(city) {
    try {
        const currentResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        const currentData = await currentResponse.json();

        const forecastResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
        );
        const forecastData = await forecastResponse.json();

        updateUI(currentData, forecastData);
    } catch (error) {
        console.error('Error:', error);
        alert('Weather or Forcast not available');
    }
}

function updateUI(currentData, forecastData) {
    // Update current weather
    document.getElementById('currentWeather').innerHTML = `
        <h2>${currentData.name}</h2>
        <div class="row justify-content-center">
            <div class="col-md-6">
                <img src="https://openweathermap.org/img/wn/${currentData.weather[0].icon}@2x.png" class="weather-icon">
                <h3 class="mb-3">${Math.round(currentData.main.temp)}°C</h3>
                <p class="mb-1">Humidity: ${currentData.main.humidity}%</p>
                <p class="mb-1">Wind: ${currentData.wind.speed} m/s</p>
                <p>${currentData.weather[0].description}</p>
            </div>
        </div>
    `;

    changeBackground(currentData.weather[0].main);

    const forecastElement = document.getElementById('forecast');
    forecastElement.innerHTML = '';

    const dailyForecasts = [];
    const dates = new Set();

    forecastData.list.forEach(forecast => {
        const date = forecast.dt_txt.split(' ')[0];
        if (!dates.has(date)) {
            dates.add(date);
            dailyForecasts.push(forecast);
        }
    });

    dailyForecasts.slice(1, 5).forEach(forecast => {
        const date = new Date(forecast.dt * 1000).toLocaleDateString('en-US', {
            weekday: 'short',
            day: 'numeric'
        });

        forecastElement.innerHTML += `
            <div class="col forecast-card text-center">
                <h5>${date}</h5>
                <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" width="60">
                <p class="mb-0">${Math.round(forecast.main.temp)}°C</p>
                <small>${forecast.weather[0].main}</small>
            </div>
        `;
    });
}

function changeBackground(weather) {
    let backgroundUrl = '';
    console.log(weather);
    
    if (weather.includes('Clear')) {
        backgroundUrl = "url('https://media.istockphoto.com/id/2080092155/photo/sea-and-mountains-landscape-view-near-antalya-turkey.webp?b=1&s=612x612&w=0&k=20&c=Lzd6SueMo1ZI9Ell88u7zMe14dbk3oULqxOp1yF4ekQ=')";
    } else if (weather.includes('Clouds')) {
        backgroundUrl = "url('https://images.pexels.com/photos/844297/pexels-photo-844297.jpeg?auto=compress&cs=tinysrgb&w=600')";
    } else if (weather.includes('Rain')) {
        backgroundUrl = "url('https://images.pexels.com/photos/913807/pexels-photo-913807.jpeg?auto=compress&cs=tinysrgb&w=600')";
    } else if (weather.includes('Snow')) {
        backgroundUrl = "url('https://images.pexels.com/photos/30611543/pexels-photo-30611543/free-photo-of-snowy-radio-tower-in-winter-landscape.jpeg?auto=compress&cs=tinysrgb&w=600')";
    } else if (weather.includes('Thunderstorm')) {
        backgroundUrl = "url('https://images.pexels.com/photos/2418664/pexels-photo-2418664.jpeg?auto=compress&cs=tinysrgb&w=600')";
    } else if (weather.includes('Drizzle')) {
        backgroundUrl = "url('https://images.pexels.com/photos/913807/pexels-photo-913807.jpeg?auto=compress&cs=tinysrgb&w=600')";
    } else if (weather.includes('Mist') || weather.includes('Fog') || weather.includes('Haze')) {
        backgroundUrl = "url('https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg?auto=compress&cs=tinysrgb&w=600')";s
    } else {
        backgroundUrl = "url('https://media.istockphoto.com/id/2080092155/photo/sea-and-mountains-landscape-view-near-antalya-turkey.webp?b=1&s=612x612&w=0&k=20&c=Lzd6SueMo1ZI9Ell88u7zMe14dbk3oULqxOp1yF4ekQ=')";
    }

    document.body.style.background = `${backgroundUrl} no-repeat center center fixed`;
    document.body.style.backgroundSize = "cover";
}

