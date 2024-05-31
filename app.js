document.getElementById('searchForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const city = document.getElementById('cityInput').value;

    try {
        const weatherResponse = await fetch(`https://api.weatherapi.com/v1/current.json?key=78e4be2604034d3bbe2210118243005&q=${city}`);
        if (!weatherResponse.ok) throw new Error('Weather API request failed');
        const weatherData = await weatherResponse.json();
        console.log(weatherData)

        const weatherDescription = weatherData.current.condition.text;
        const temperature = weatherData.current.temp_f;
        const localTime = weatherData.location.localtime;
        const name = weatherData.location.name;
        const icon = weatherData.current.condition.icon;

        document.getElementById('cityName').innerText = `City Name: ${name}`;
        document.getElementById('weatherDisplay').innerText = `Weather: ${weatherDescription}`;
        document.getElementById('tempDisplay').innerText = `Temp: ${temperature}°F`;
        document.getElementById('timeDisplay').innerText = `Current Time: ${formatDateTime(localTime)}`;

        const weatherIcon = document.getElementById('weatherIcon');
        weatherIcon.src = `http:${icon}`;
        weatherIcon.style.display = 'block';
    } catch (error) {
        console.error('Error fetching weather data:', error);
        document.getElementById('weatherDisplay').innerText = 'Could not fetch weather data. Please try again.';
        document.getElementById('timeDisplay').innerText = '';
        document.getElementById('weatherIcon').style.display = 'none';
    }
});

function formatDateTime(dateTimeString) {
    const date = new Date(dateTimeString);
    const options = { 
        year: 'numeric', month: 'long', day: 'numeric', 
        hour: 'numeric', minute: 'numeric', hour12: true 
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
}
