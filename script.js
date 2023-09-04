const apiKey = '4c445e7ae69f638d3409188bd4598549'; // Replace with your API key

        const searchBtn = document.getElementById('searchBtn');
        const cityInput = document.getElementById('cityInput');
        const weatherInfo = document.getElementById('weatherInfo');

        searchBtn.addEventListener('click', () => {
            const cityName = cityInput.value.trim();
            if (cityName) {
                getWeather(cityName);
            } else {
                alert('Please enter a city name.');
            }
        });

        async function getWeather(cityName) {
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`);
                const data = await response.json();

                if (data.cod === 200) {
                    const temperature = data.main.temp;
                    const description = data.weather[0].description;
                    const iconCode = data.weather[0].icon;

                    const weatherHtml = `
                        <h2>Weather in ${cityName}</h2>
                        <p>Temperature: ${temperature}°C</p>
                        <p>Description: ${description}</p>
                        <img src="https://openweathermap.org/img/wn/${iconCode}.png" alt="${description}">
                    `;

                    weatherInfo.innerHTML = weatherHtml;
                } else {
                    weatherInfo.innerHTML = 'City not found.';
                }
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        }