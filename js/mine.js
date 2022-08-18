var navLinks = Array.from(document.querySelectorAll('.nav-item a'));
for (var i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener("click", function () {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}

var allData = [];

async function getWeather(city) {
  var myResponse = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=a682871a98554654bcf73801221601&q=${city}&days=7`);
  var data = await myResponse.json();
  allData = data;

  displayWeather();
  date();
};

getWeather('damietta');

var search = document.getElementById('search');
search.addEventListener('keydown', function () {
  var currentCity = search.value;
  getWeather(currentCity);
})

function displayWeather() {
  // Today
  document.getElementById('city').innerHTML = allData.location.name;
  document.getElementById('temp').innerHTML = allData.current.temp_c;
  document.getElementById('text').innerHTML = allData.current.condition.text;
  document.getElementById('humidity').innerHTML = allData.current.humidity;
  document.getElementById('speed').innerHTML = allData.current.wind_kph;
  document.getElementById('direction').innerHTML = allData.current.wind_dir;
  document.getElementById('icon').src = allData.current.condition.icon;

  // Tomorrow
  document.getElementById('iconTomorrow').src = allData.forecast.forecastday[1].day.condition.icon;
  document.getElementById('tempTomorrowMax').innerHTML = allData.forecast.forecastday[1].day.maxtemp_c;
  document.getElementById('tempTomorrowMin').innerHTML = allData.forecast.forecastday[1].day.mintemp_c;
  document.getElementById('textTomorrow').innerHTML = allData.forecast.forecastday[1].day.condition.text;

  // After Tomorrow
  document.getElementById('iconAfterTomorrow').src = allData.forecast.forecastday[2].day.condition.icon;
  document.getElementById('tempAfterTomorrowMax').innerHTML = allData.forecast.forecastday[2].day.maxtemp_c;
  document.getElementById('tempAfterTomorrowMin').innerHTML = allData.forecast.forecastday[2].day.mintemp_c;
  document.getElementById('textAfterTomorrow').innerHTML = allData.forecast.forecastday[2].day.condition.text;
}



function date() {
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var d = new Date();
  var month = months[d.getMonth()];

  var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var day = days[d.getDay()];

  document.getElementById('day').innerHTML = day;
  document.getElementById('date').innerHTML = d.getDate() + '  ' + month;

  // document.getElementById('tomorrow').innerHTML = days[d.getDay() + 1];
  document.getElementById('tomorrow').innerHTML = days[new Date(allData.forecast.forecastday[1].date).getDay()];

  document.getElementById('afterTomorrow').innerHTML = days[new Date(allData.forecast.forecastday[2].date).getDay()];;
}


