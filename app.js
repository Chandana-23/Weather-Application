const iconElement = document.querySelector('.weather-icon');
const locationIcon = document.querySelector('.location-icon');
const tempElement = document.querySelector('.temp-value p');
const descElement = document.querySelector('.temp-desc p');
const locationElement = document.querySelector('.location p');
const notificationElement = document.querySelector('.notification');

let input = document.getElementById('search');
let city = "";
let latitude = 0.0;
let longitude = 0.0;

input.addEventListener('keyup',function(event)
{
    if(event.keyCode===13){
        event.preventDefault();

        city=input.value
        getSearchWeather(city)
        console.log(city)
    }
})

const weather = {};

weather.temprature = {
    unit:"celsius"
}

const KELVIN = 273;
const key = 'f5ff7fb5af5699a48135187947f9037a';

if("geolocation" in navigator)
{
    navigator.geolocation.getCurrentPosition(setPosition,shoerr);
}
else{
    notificationElement.style.display = 'block';
    notificationElement.innerHTML = '<p>Browser doesnot support geolocation</p>';
}


function setPosition(position)
{
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    getWeather(latitude,longitude);
}

locationIcon.addEventListener('click',function(event){
    console.log('Hey');
    getWeather(latitude,longitude);
});

function shoerr(error)
{
    notificationElement.style.display='block';
    notificationElement.innerHTML=error.message;
}

function getSearchWeather(city)
{
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
    fetch(api)
    .then(function(response)
    {
        let data = response.json();
        return data;
    })
    .then(function(data){
        weather.temprature.value = Math.floor(data.main.temp -KELVIN);
        weather.description=data.weather[0].description;
        weather.iconId = data.weather[0].icon;
        weather.city = data.name;
        weather.country = data.sys.country;
    })
    .then(function()
    {
        displayWeather();
    })
}

function getWeather(latitude,longitude)
{
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`
    fetch(api)
    .then(function(response)
    {
        let data = response.json();
        return data;
    })
    .then(function(data){
        weather.temprature.value = Math.floor(data.main.temp -KELVIN);
        weather.description=data.weather[0].description;
        weather.iconId = data.weather[0].icon;
        weather.city = data.name;
        weather.country = data.sys.country;
    })
    .then(function()
    {
        displayWeather();
    })

}

function displayWeather()
{
    // iconElement.innerHTML = `<img src="./${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temprature.value}*<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city},${weather.country}`;
}