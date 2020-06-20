$(document).ready(function () {
    $.ajax({
        type: 'GET',
        url: "https://restcountries.eu/rest/v2/all",
        success: function (countriesData) {
            console.log(countriesData);

            for (let i = 0; i < countriesData.length; i++) {
                $('#country').append(
                    `<option value="${i}">${countriesData[i].name}</option>`
                )
            };

            $('#country').change(function () {
                let selectedCountry = $('#country').val();
                $.ajax({
                    type: 'GET',
                    url: `http://api.openweathermap.org/data/2.5/weather?q=${countriesData[selectedCountry].capital}&appid=2dfe00701b9f5c0a741fe1a5da0ebb05`,
                    success: function (weatherData) {
                        console.log(weatherData);
                        console.log(weatherData.wind.speed);

                        let languages = '';
                        for (i = 0; i < countriesData[selectedCountry].languages.length; i++) {
                            languages += countriesData[selectedCountry].languages[i].name + ', ';
                        }
                        $('#main').empty();
                        $('#main').append(
                            `<div class="row">
                            <div class="col countryName" id="detail">
                              <h3>Country Name</h3>
                              <p>Native Name: ${countriesData[selectedCountry].nativeName}</p>
                              <p>Capital: ${countriesData[selectedCountry].capital}</p>
                              <p>Region: ${countriesData[selectedCountry].region}, ${countriesData[selectedCountry].subregion}</p>
                              <p>Population: ${countriesData[selectedCountry].population}</p>
                              <p>Language: ${languages}</p>
                              <p>Time Zone: ${countriesData[selectedCountry].timezones}</p>
                            </div>
                            <div class="col bg-orange" id="callingCode">
                              <h3 class="callingCode">CALLING CODE</h3>
                              <h3 class="code">${countriesData[selectedCountry].callingCodes}</h3>
                            </div>
                            <div class="col" id="flag">
                            <img src="${countriesData[selectedCountry].flag}" alt="flag">
                            </div>
                          </div>
                          <div class="row">
                            <div class="col" id="weather">
                            <h3 class="weatherHead">CAPITAL WEATHER REPORT</h3>
                              <p>Wind Speed: ${weatherData.wind.speed} km/h</p>
                              <p>Temperature: ${weatherData.main.temp - 273} C</p>
                              <p>Humidity: ${weatherData.main.humidity}</p>
                              <p>Visibility: ${weatherData.visibility}</p>
                            </div>
                            <div class="col" id="map">
                              <h3>map</h3>
                            </div>
                          </div>`
                        );
                        // Initialize and add the map
                        initMap()

                        function initMap() {
                            // The location of city
                            let city = {
                                lat: countriesData[selectedCountry].latlng[0],
                                lng: countriesData[selectedCountry].latlng[1]
                            };
                            // The map, centered at Uluru
                            let map = new google.maps.Map(
                                document.getElementById('map'), {
                                    zoom: 4,
                                    center: city
                                });
                            // The marker, positioned at Uluru
                            let marker = new google.maps.Marker({
                                position: city,
                                map: map
                            });
                        }
                    }
                })
            })
        }
    });
});