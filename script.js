const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');
const weather_body = document.querySelector(".weather-body");
const current_location = document.querySelector(".city_name");
const location_not_found = document.querySelector(".location-not-found");
const curr_loc = document.querySelector("#curr_loc");
const background_img=document.querySelector(".weather-body")

const api_key = "c893642dddb767dca1fad03569b1bae4";
// const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
// const url2=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`;


async function checkWeather(url) {
    try {

        const weather_data = await fetch(url).then(response => response.json());

        if (weather_data.cod === `404`) {
            location_not_found.style.display = "block";
            weather_body.style.display = "none";
            console.log("error");
            return;
        }

        // console.log(weather_data);
        location_not_found.style.display = "none";
        weather_body.style.display = "flex";
        // current_location.innerHTML = city;

        switch (weather_data.weather[0].main) {
            case 'clouds':
                weather_img.src = './assets/cloud.png';
                break;
            case 'Clear':
                weather_img.src = "./assets/clear.png";
                break;
            case 'Rain':
                weather_img.src = "./assets/rain.png";
                break;
            case 'Smoke':
                weather_img.src = "./assets/mist.png";
                break;
            case 'Snow':
                weather_img.src = "./assets/snow.png";
                break;

        }


        temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
        description.innerHTML = `${weather_data.weather[0].description}`;

        humidity.innerHTML = `${weather_data.main.humidity}%`;
        wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;
        inputBox.value = "";
    } catch (error) {
        console.log(error);
    }
}



function weatherByCity() {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputBox.value}&appid=${api_key}`;
        checkWeather(url);
        current_location.innerHTML = inputBox.value;

    } catch (error) {
        console.log(error);
    }
}

function weatherByCoordinate(lati, longi) {
    try {

        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${longi}&appid=${api_key}`;
        checkWeather(url);
        current_location.innerHTML=`(${lati} , ${longi})`;


    } catch (error) {
        console.log(error);
    }
}



searchBtn.addEventListener('click', () => {
    weatherByCity();

});

inputBox.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        searchBtn.click();
    }
});

curr_loc.addEventListener('click', () => {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const long = position.coords.longitude;
            
            weatherByCoordinate(lat, long);

        }, (error) => {
            console.log(error);
        })
    }
    else {
        current_location.innerHTML = "Geolocation is not supported by this browser.";
    }

})


