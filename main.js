let appId = 'bda4e1902e1235e2d8fb387df6fab50c';
let units = 'imperial';
let searchMethod; 'zip';
var url = 'http://api.openweathermap.org/data/2.5/weather?&units=imperial&APPID=' + appId;
var tempF = document.querySelector('#tempF');
var tempC = document.querySelector('#tempC');
var tempK = document.querySelector('#tempK')
function getSearchMethod(searchTerm) {
    if (searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm)
        searchMethod = 'zip';
    else
        searchMethod = 'q';
}

async function searchWeather(searchTerm) {
    getSearchMethod(searchTerm);
    await fetch(url + '&zip=' + searchTerm).then(result => {
        return result.json();

    }).then(result => {
        updateUI(result);
    })
}

function updateUI(resultFromServer) {
   

         
    console.log(resultFromServer);
    
    let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
    let temperatureElement = document.getElementById('temperature');
    let humidityElement = document.getElementById('humidity');
    let cityHeader = document.getElementById('cityHeader');
    let weatherIcon = document.getElementById('img-icon');

    // weatherIconImg.src ='http://openweathermap.org/img/wn/10d@2x.png' + resultFromServer.weather[0],icon + '.png';

    let resultDescription = resultFromServer.weather[0].description;

    weatherDescriptionHeader.innerText = resultDescription;
    tempF.innerText = resultFromServer.temperatureElement;
}

document.getElementById('searchBtn').addEventListener('click', () => {
    let searchTerm = document.getElementById('searchInput').value;
    if (searchTerm)
        searchWeather(searchTerm);
})

