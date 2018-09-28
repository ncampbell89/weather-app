var x;

if ("geolocation" in navigator) {
	navigator.geolocation.getCurrentPosition(function(position) {
		loadWeather(x = position.coords.latitude + ',' + position.coords.longitude);
	});
} else {
	loadWeather("Kolkata, IN", ""); //if it doesn't support 'geolocation'
}

loadWeather(x);

$(document).ready(function() {
	loadWeather(x);
});

function loadWeather(location, woeid) {
	$.simpleWeather({
		location: location,
		woeid: woeid,
		unit: 'c',
		success: function(weather) {
			city = weather.city;
			tempC = weather.temp + '&deg;';
			tempF = Math.floor(Math.round((weather.temp * (9/5)) + 32)) + '&deg;';
			wcode = '<img class="weathericon" src="images/weathericons/' + weather.code + '.svg">';
			wind = '<p>' + weather.wind.speed + '</p><p>' + weather.units.speed + '</p>';
			humidity = weather.humidity + '%';

			$('.location').text(city);
			$('.temperature').html(tempF);

			$('.f').on('click', function() {
				$('.temperature').html(tempF);
			});

			$('.c').on('click', function() {
				$('.temperature').html(tempC);
			});
			
			$('.climate_bg').html(wcode);
			$('.windspeed').html(wind);
			$('.humidity').text(humidity);
		},

		error: function(error) {
			$('.error').html('<p>' + error + '</p>');
		}
	});
};