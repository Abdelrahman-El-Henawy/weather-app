let day1 = document.getElementById("day1");
let date1 = document.getElementById("date1");
let month1 = document.getElementById("month1")
let country = document.getElementById("country");
let temp = document.getElementById("temp");
let imgCondition = document.getElementById("imgCondition");
let Condition = document.getElementById("Condition");
let humidity = document.getElementById("humidity");
let windSpeed = document.getElementById("windSpeed");
let windDirection = document.getElementById("windDirection");
// next forecast
let nextDay1 = document.getElementById("nextDay1");
let imgCondition1 = document.getElementById("imgCondition1")
let nextCondition1 = document.getElementById("nextCondition1");
let nextMaxTemp1 = document.getElementById("nextMaxTemp1");
let nextMinTemp1 = document.getElementById("nextMinTemp1");

let nextDay2 = document.getElementById("nextDay2")
let nextMaxTemp2 = document.getElementById ("nextMaxTemp2")
let nextMinTemp2 = document.getElementById ("nextMinTemp2")
let imgCondition2 = document.getElementById ("imgCondition2")
let nextCondition2 = document.getElementById ("nextCondition2")

let searchInput = document.getElementById("searchInput");
let searchBtn = document.getElementById("searchBtn");



async function getCurrentWeatherData(country) {
  var weatherResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=44a9d9e16e39442cb69225129231608&q=${country}&days=3`);
  var weatherData = await weatherResponse.json();
  if(!weatherData.error){
    displayWeatherData(weatherData);
    displayNextDayData1(weatherData);
    displayNextDayData2(weatherData);
  }

}

function displayWeatherData(data) {
  let currentData = data.current;
  const todayDate = new Date()
  day1.innerHTML = todayDate.toLocaleDateString("en-us",{weekday:"long"});
  date1.innerHTML = todayDate.getDate()
  month1.innerHTML = todayDate.toLocaleDateString("en-us",{month:"long"});

  country.innerHTML = data.location.name;
  temp.innerHTML = currentData.temp_c + "<sup>o</sup>";
  imgCondition.setAttribute("src", currentData.condition.icon);
  Condition.innerHTML = currentData.condition.text;
  humidity.innerHTML = currentData.humidity + "%";
  windSpeed.innerHTML = currentData.wind_kph + "km/h";
  windDirection.innerHTML = currentData.wind_dir;
}

function displayNextDayData1(data) {
  let nextDayData1 = data.forecast.forecastday;
  const nextDate1 = new Date(nextDayData1[1].date)
  nextDay1.innerHTML = nextDate1.toLocaleDateString("en-us",{weekday:"long"})
  nextMaxTemp1.innerHTML = nextDayData1[1].day.maxtemp_c;
  nextMinTemp1.innerHTML = nextDayData1[1].day.mintemp_c;
  imgCondition1.setAttribute("src", nextDayData1[1].day.condition.icon)
  nextCondition1.innerHTML = nextDayData1[1].day.condition.text;
}
function displayNextDayData2(data){
  let nextDayData2 = data.forecast.forecastday;
  const nextDate2 = new Date(nextDayData2[2].date)
  nextDay2.innerHTML = nextDate2.toLocaleDateString("en-us",{weekday:"long"})
  nextMaxTemp2.innerHTML = nextDayData2[2].day.maxtemp_c;
  nextMinTemp2.innerHTML = nextDayData2[2].day.mintemp_c;
  imgCondition2.setAttribute("src", nextDayData2[2].day.condition.icon)
  nextCondition2.innerHTML = nextDayData2[2].day.condition.text;
}


window.addEventListener("DOMContentLoaded", function(){
  if(searchInput.value == ""){
   getCurrentWeatherData("cairo")
    }

  })

searchInput.addEventListener("keydown", function(){
 getCurrentWeatherData(searchInput.value)
})
