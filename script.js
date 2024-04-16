function searchWeather() {
    var location = document.getElementById("search").value;
    
    // Replace 'YOUR_API_KEY' with your actual API key
    var apiKey = '80d3aca485217bf1b83d2e454f96e343#';
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + location + '&appid=' + apiKey;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Update weather information
            var weatherInfo = document.getElementById("weather-info");
            weatherInfo.innerHTML = "Temperature: " + (data.main.temp - 273.15).toFixed(2) + "°C<br>";
            weatherInfo.innerHTML += "Weather: " + data.weather[0].main;

         
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            // Display an error message if unable to fetch weather data
            var weatherInfo = document.getElementById("weather-info");
            weatherInfo.innerHTML = "Unable to fetch weather data for the specified location.";
            var weatherImage = document.getElementById("weather-image");
            weatherImage.style.display = "block"; // Hide the weather image
        });
}
