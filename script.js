const apiKey = "c3963cf20eff1d4a906f1261031d077f";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(cityName) {
	const response = await fetch(apiUrl + cityName + `&appid=${apiKey}`);

	if (response.status == 404) {
		document.querySelector(".error").style.display = "block";
		document.querySelector(".weather").style.display = "none";
	} else {
		var data = await response.json();
		console.log(data);
		document.querySelector(".city").innerHTML = data.name;
		document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
		document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
		document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

		if (data.weather[0].main == "Clouds") {
			weatherIcon.src = "./images/clouds.png";
		} else if (data.weather[0].main == "Clear") {
			weatherIcon.src = "./images/clear.png";
		} else if (data.weather[0].main == "Rain") {
			weatherIcon.src = "./images/rain.png";
		} else if (data.weather[0].main == "Drizzle") {
			weatherIcon.src = "./images/drizzle.png";
		} else if (data.weather[0].main == "Mist") {
			weatherIcon.src = "./images/mist.png";
		}
		document.querySelector(".weather").style.display = "block";
		document.querySelector(".error").style.display = "none";
	}
}
searchBtn.addEventListener("click", () => {
	var cityName = searchBox.value;
	checkWeather(cityName);
});
searchBox.addEventListener("keypress", (event) => {
	if (event.key == "Enter") {
		var cityName = searchBox.value;
		checkWeather(cityName);
	}
});
