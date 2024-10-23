const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {

    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;

    fetch(`http://wttr.in/${city}?format=j1`)
        
        .then(response => response.json())
        
        .then(json => {

            if (!json || !json.current_condition || !json.current_condition[0]) {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            const condition = json.current_condition[0].weatherDesc[0].value;
            switch (condition) {
                case 'Sunny':
                    image.src = 'images/clear.png';
                    break;

                case 'Rain':
                    image.src = 'images/rain.png';
                    break;

                case 'Snow':
                    image.src = 'images/snow.png';
                    break;

                case 'Cloudy':
                    image.src = 'images/cloud.png';
                    break;

                case 'Haze':
                    image.src = 'images/mist.png';
                    break;
    
                default:
                    image.src = '';
                
            }

            temperature.innerHTML = `${json.current_condition[0].temp_C}<span>°C</span>`;
            description.innerHTML = `${condition}`;
            humidity.innerHTML = `${json.current_condition[0].humidity}%`;
            wind.innerHTML = `${json.current_condition[0].windspeedKmph}m/s`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';


        });


});
