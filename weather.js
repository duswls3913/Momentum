const API_KEY = "e9ee9bf8bda4bb7f2f89536ac92517a9";
const COORDS = 'coords';
const weather = document.querySelector(".js-weather");

function getWeather(lat,lon) {
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    const temperature = json.main.temp;
    const place = json.name;
    weather.innerText = `${temperature} @${place}`;
  })
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS,JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  console.log(longitude,latitude);
  const coordsObj = {
    latitude,
    longitude
  };
  console.log(coordsObj);
  saveCoords(coordsObj);
  getWeather(latitude,longitude);
}
function handleGeoError() {
  console.log("Error in getting position")

}
function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSucces,handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if(loadedCoords === null){
    askForCoords();
  }else{
    const parsedCoords = JSON.parse(loadedCoords);
    console.log(parsedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }

}

function init() {
  loadCoords();
}

init();
