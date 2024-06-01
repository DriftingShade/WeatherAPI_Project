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
        const feelsLike = weatherData.current.feelslike_f;


        document.getElementById('cityName').innerText = name;
        document.getElementById('weatherDisplay').innerText = weatherDescription;
        document.getElementById('tempDisplay').innerText = `${temperature}°F`;
        document.getElementById('timeDisplay').innerText = `As of ${formatDateTime(localTime)}`;
        document.getElementById('feelsLikeTemp').innerText = `RealFeel: ${feelsLike}°F`;

        const weatherIcon = document.getElementById('weatherIcon');
        weatherIcon.src = `http:${icon}`;
        weatherIcon.style.display = 'block';

        document.getElementById('weatherCard').style.display = 'block';  // Show the weather card
    } catch (error) {
        console.error('Error fetching weather data:', error);
        document.getElementById('weatherCard').style.display = 'none';  // Hide the weather card in case of an error
    }
});

function formatDateTime(dateTimeString) {
    const date = new Date(dateTimeString);
    const options = { 
        hour: 'numeric', minute: 'numeric', hour12: true, timeZoneName: 'short' 
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
}
