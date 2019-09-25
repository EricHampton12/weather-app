var zipInput = document.getElementById("zipInput");
var weatherButton = document.getElementById("weatherButton");

var error = document.getElementById("error");
var errorMessage = document.getElementById("errorMessage");

var output = document.getElementById("output");

var conditionOutput = document.getElementById("conditionOutput");
var temperatureOutputK = document.getElementById("temperatureOutputK");
var temperatureOutputF = document.getElementById("temperatureOutputF");
var temperatureOutputC = document.getElementById("temperatureOutputC");
var cityOutput = document.getElementById("cityOutput");
var weatherIcon = document.getElementById("weatherIcon");


var apiRequest;



// Wait for page to load before making button work
document.onreadystatechange = function() {
  if (document.readyState == "interactive") {
    weatherButton.onclick = getWeather;
  }
};


function getWeather() {

  var url="https://api.openweathermap.org/data/2.5/weather?zip=<zipcode>&us&appid=bda4e1902e1235e2d8fb387df6fab50c";
  url = url.replace("<zipcode>", zipInput.value); 

  apiRequest = new XMLHttpRequest();
  apiRequest.onload = catchResponse;
  apiRequest.onerror = httpRequestOnError;
  apiRequest.open('get', url, true);
  apiRequest.send();

}


function catchResponse() {

  if (apiRequest.statusText === "OK") {

    errorMessage.innerHTML = '';
    error.style.display = 'none';
    output.style.display = 'block';

    parseResponse();

  }

  else {

    errorMessage.innerHTML = JSON.parse(apiRequest.responseText).message;
    error.style.display = 'block';
    output.style.display = 'none';

  }
  
  console.log(JSON.parse(apiRequest.responseText));


}

function parseResponse() {



    var results = JSON.parse(apiRequest.responseText);

    var tempK = Math.round(results.main.temp);
    var tempF = Math.round(9/5 * (tempK - 273) + 32); // 9/5 (K - 273) + 32
    var tempC = tempK - 273; // K - 273

    temperatureOutputK.innerHTML = tempK + "&deg;";
    temperatureOutputF.innerHTML = tempF + "&deg;";
    temperatureOutputC.innerHTML = tempC + "&deg;";

    cityOutput.innerHTML = results.name;

    
    conditionOutput.innerHTML = results.weather[0].description;
    var iconSrc = results.weather[0].icon;
    
    weatherIcon.setAttribute("src", `http://openweathermap.org/img/w/${iconSrc}.png`);
    

}

function httpRequestOnError() {

    errorMessage.innerHTML = "HTTP request could not be completed";
    error.style.display = 'block';
    output.style.display = 'none';


}
