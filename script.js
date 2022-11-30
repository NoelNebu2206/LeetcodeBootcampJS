let getLocationButton = document.getElementById("getLocationButton");

/**
 * Adds functionality to location button.
 * Retrieves current lat/long positions using geolocation.
 */
getLocationButton.addEventListener("click", () => {
  loader.style.display = 'block';
  navigator.geolocation.getCurrentPosition((position) => {
    //let lat = position.coords.latitude;
    let lat = 10.99;
    //let long = position.coords.longitude;
    let long = 44.34;

    getWeatherData(lat, long);
  });
});

var requestOptions = {
  method: "GET",
  redirect: "follow",
};

var appid = "c5346e78645f4609851bc734b9a51bc6";

/**
 * Fetches Open Weather Data API.
 * @param {string} latitude - Current latitude.
 * @param {string} longitude - Current longitude.
 */
async function getWeatherData(latitude, longitude) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${appid}`,
    requestOptions
  );
  var data = await response.json();
  console.log(data); // Use this to explore the API response

  displayData(data);
  loader.style.display = 'none';
}

/**
 * Displays the weather data via HTML.
 * @param {object} data - Open Weather Data API JSON response.
 */
function displayData(data) {
  var cityName = data.name;
  var icon = data.weather[0].icon;

  document.getElementById("city").innerHTML = cityName;
  document.getElementById("temp").innerHTML = convertToFahrenheit(
    data.main.temp
  );
  document.getElementById(
    "icon"
  ).src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
}

/**
 * Converts Kelvin to Fahrenheit temperature scale.
 * @param {string} temp - The title of the book.
 * @returns {string} Current temperature in Fahrenheit.
 */
function convertToFahrenheit(temp) {
  return Math.trunc((temp - 273.15) * 1.8 + 32) + "&deg; F";
}
