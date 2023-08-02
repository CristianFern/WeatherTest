

async function checkWeather(coordinates){
    lat = coordinates[0];
    lng = coordinates[1];


    const apiUrl = "https://api.open-meteo.com/v1/forecast?latitude=" + lat +"&longitude=" + lng + "&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto&current_weather=true";

    const response = await fetch(apiUrl);
    var data = await response.json();

    console.log(data);

    document.getElementById("currentTemperature").innerHTML = data.current_weather.temperature + "°C";

    let date = new Date;

    let localTimeDate = data.current_weather.time.slice(8,10) + "/" + data.current_weather.time.slice(5,7) + "/" + data.current_weather.time.slice(0,4);
    let localTime = data.current_weather.time.slice(11,16);
    let currentLocalTime = "Local Time(" + localTimeDate + ", " + localTime + ")";

    let weatherCodeArray = []

   

    
    document.getElementById("currentLocalTime").innerHTML = currentLocalTime;

    if(data.current_weather.temperature > 37){
        document.getElementById("currentTemperature").style.color = "red";
    }
    else if(data.current_weather.temperature >= 30 && data.current_weather.temperature <37){
        document.getElementById("currentTemperature").style.color = "orange";
    }
    else if(data.current_weather.temperature >= 25 && data.current_weather.temperature <30){
        document.getElementById("currentTemperature").style.color = "rgb(254, 191, 0)";
    }
    else if(data.current_weather.temperature >= 19 && data.current_weather.temperature <25){
        document.getElementById("currentTemperature").style.color = "green";
    }
    else if(data.current_weather.temperature >= 5 && data.current_weather.temperature <19){
        document.getElementById("currentTemperature").style.color = "rgb(89, 102, 246)";
    }
    else if(data.current_weather.temperature >= -10 && data.current_weather.temperature <5){
        document.getElementById("currentTemperature").style.color = "rgb(59, 74, 243)";
    }
    else if(data.current_weather.temperature >= -20 && data.current_weather.temperature <-10){
        document.getElementById("currentTemperature").style.color = "rgb(31, 48, 243)";
    }
    else if(data.current_weather.temperature < -20 ){
        document.getElementById("currentTemperature").style.color = "rgb(0, 21, 255)";
    }

   if (data.current_weather.is_day === 1) {
        //dia
      
        if(data.current_weather.weathercode === 0){
            document.getElementById("currentWeatherIcon").src = "icons/clearsky_0.png";
        }
        else if (data.current_weather.weathercode === 1) {
            document.getElementById("currentWeatherIcon").src = "icons/mainlyClear_1.png";
        }
        else if (data.current_weather.weathercode === 2) {
            document.getElementById("currentWeatherIcon").src = "icons/partlyClear_2.png";
        }
        else if (data.current_weather.weathercode === 3) {
            document.getElementById("currentWeatherIcon").src = "icons/overcast_3.png";
        }
        else if (data.current_weather.weathercode === 45) {
            document.getElementById("currentWeatherIcon").src = "icons/fog_45.png";
        }
        else if (data.current_weather.weathercode === 48) {
            document.getElementById("currentWeatherIcon").src = "icons/denseFog_48.png";
        }
        else if (data.current_weather.weathercode === 51 || data.current_weather.weathercode === 53 || data.current_weather.weathercode === 55) {
            document.getElementById("currentWeatherIcon").src = "icons/drizzle_51_53_55.png";
        }
        else if (data.current_weather.weathercode === 61 || data.current_weather.weathercode === 63 || data.current_weather.weathercode === 65) {
            document.getElementById("currentWeatherIcon").src = "icons/rain_61_63_65.png";
        }
        else if (data.current_weather.weathercode === 66 || data.current_weather.weathercode === 67) {
            document.getElementById("currentWeatherIcon").src = "icons/freezingRain_66_67.png";
        }
        else if (data.current_weather.weathercode === 71 || data.current_weather.weathercode === 73 || data.current_weather.weathercode === 75) {
            document.getElementById("currentWeatherIcon").src = "icons/snow_71_73_75.png";
        }
        else if (data.current_weather.weathercode === 56 || data.current_weather.weathercode === 57 || data.current_weather.weathercode === 77) {
            document.getElementById("currentWeatherIcon").src = "icons/snowGrains_56_57_77.png";
        }
        else if (data.current_weather.weathercode === 80 || data.current_weather.weathercode === 81 || data.current_weather.weathercode === 82) {
            document.getElementById("currentWeatherIcon").src = "icons/rainShower_80_81_82.png";
        }
        else if (data.current_weather.weathercode === 85 || data.current_weather.weathercode === 86) {
            document.getElementById("currentWeatherIcon").src = "icons/snowShower_85_86.png";
        }
        else if (data.current_weather.weathercode === 95 || data.current_weather.weathercode === 96 || data.current_weather.weathercode === 99) {
            document.getElementById("currentWeatherIcon").src = "icons/rainShower_80_81_82.png";
        }
   } else {
        //noite
        if(data.current_weather.weathercode === 0){
            document.getElementById("currentWeatherIcon").src = "icons/clearsky_0_night.png";
        }
        else if (data.current_weather.weathercode === 1) {
            document.getElementById("currentWeatherIcon").src = "icons/mainlyClear_1_night.png";
        }
        else if (data.current_weather.weathercode === 2) {
            document.getElementById("currentWeatherIcon").src = "icons/partlyClear_2_night.png";
        }
        else if (data.current_weather.weathercode === 3) {
            document.getElementById("currentWeatherIcon").src = "icons/overcast_3_night.png";
        }
        else if (data.current_weather.weathercode === 45) {
            document.getElementById("currentWeatherIcon").src = "icons/fog_45_night.png";
        }
        else if (data.current_weather.weathercode === 48) {
            document.getElementById("currentWeatherIcon").src = "icons/denseFog_48_night.png";
        }
        else if (data.current_weather.weathercode === 51 || data.current_weather.weathercode === 53 || data.current_weather.weathercode === 55) {
            document.getElementById("currentWeatherIcon").src = "icons/drizzle_51_53_55_night.png";
        }
        else if (data.current_weather.weathercode === 61 || data.current_weather.weathercode === 63 || data.current_weather.weathercode === 65) {
            document.getElementById("currentWeatherIcon").src = "icons/rain_61_63_65_night.png";
        }
        else if (data.current_weather.weathercode === 66 || data.current_weather.weathercode === 67) {
            document.getElementById("currentWeatherIcon").src = "icons/freezingRain_66_67_night.png";
        }
        else if (data.current_weather.weathercode === 71 || data.current_weather.weathercode === 73 || data.current_weather.weathercode === 75) {
            document.getElementById("currentWeatherIcon").src = "icons/snow_71_73_75_night.png";
        }
        else if (data.current_weather.weathercode === 56 || data.current_weather.weathercode === 57 || data.current_weather.weathercode === 77) {
            document.getElementById("currentWeatherIcon").src = "icons/snowGrains_56_57_77_night.png";
        }
        else if (data.current_weather.weathercode === 80 || data.current_weather.weathercode === 81 || data.current_weather.weathercode === 82) {
            document.getElementById("currentWeatherIcon").src = "icons/rainShower_80_81_82_night.png";
        }
        else if (data.current_weather.weathercode === 85 || data.current_weather.weathercode === 86) {
            document.getElementById("currentWeatherIcon").src = "icons/snowShower_85_86_night.png";
        }
        else if (data.current_weather.weathercode === 95 || data.current_weather.weathercode === 96 || data.current_weather.weathercode === 99) {
            document.getElementById("currentWeatherIcon").src = "icons/rainShower_80_81_82_night.png";
        }
       

   }

   for (let f = 0; f < 6; f++) {
    const day = data.daily.weathercode[f];
    let iconNumber = "day" + f + "Icon";
       
        if(day === 0){
            document.getElementById(iconNumber).src = "icons/clearsky_0.png";
        }
        else if (day === 1) {
            document.getElementById(iconNumber).src = "icons/mainlyClear_1.png";
        }
        else if (day === 2) {
            document.getElementById(iconNumber).src = "icons/partlyClear_2.png";
        }
        else if (day === 3) {
            document.getElementById(iconNumber).src = "icons/overcast_3.png";
        }
        else if (day === 45) {
            document.getElementById(iconNumber).src = "icons/fog_45.png";
        }
        else if (day === 48) {
            document.getElementById(iconNumber).src = "icons/denseFog_48.png";
        }
        else if (day === 51 || day === 53 || day === 55) {
            document.getElementById(iconNumber).src = "icons/drizzle_51_53_55.png";
        }
        else if (day === 61 || day === 63 || day === 65) {
            document.getElementById(iconNumber).src = "icons/rain_61_63_65.png";
        }
        else if (day === 66 || day === 67) {
            document.getElementById(iconNumber).src = "icons/freezingRain_66_67.png";
        }
        else if (day === 71 || day === 73 || day === 75) {
            document.getElementById(iconNumber).src = "icons/snow_71_73_75.png";
        }
        else if (day === 56 || day === 57 || day === 77) {
            document.getElementById(iconNumber).src = "icons/snowGrains_56_57_77.png";
        }
        else if (day === 80 || day === 81 || day === 82) {
            document.getElementById(iconNumber).src = "icons/rainShower_80_81_82.png";
        }
        else if (day === 85 || day === 86) {
            document.getElementById(iconNumber).src = "icons/snowShower_85_86.png";
        }
        else if (day === 95 || day === 96 || day === 99) {
            document.getElementById(iconNumber).src = "icons/rainShower_80_81_82.png";
        }
    
   }


    



    for(i=0 ; i < 6 ; i++){

        daymax = "day" + i + "max";
        daymin = "day"+ i + "min";
        day = "day"+ i ;
        

        document.querySelector("#" + daymax).innerHTML = data.daily.temperature_2m_max[i] + "°C";

        document.querySelector("#" + daymin).innerHTML = data.daily.temperature_2m_min[i] + "°C";

        

        

        daySlice = data.daily.time[i].slice(8,10);
        monthSlice = data.daily.time[i].slice(5,7);

        let dayDate = daySlice + "/" + monthSlice;


        document.querySelector("#" + day).innerHTML = dayDate;

    }

    
}

function getCoordinates(){
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    function sucess(pos){
        var crd = pos.coords;
        var lat = crd.latitude.toString();
        var lng = crd.longitude.toString();
        var coordinates = [lat, lng];
        
        checkWeather(coordinates);
        return;
    }

    function error(err){
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }


    navigator.geolocation.getCurrentPosition(sucess, error, options);

    getCity();

    
    

}


function getCity() {

    var xhr = new XMLHttpRequest();

    xhr.open('GET', "https://api.bigdatacloud.net/data/reverse-geocode-client", true);
    xhr.send();
    xhr.onreadystatechange = processRequest;
    xhr.addEventListener("readystatechange", processRequest, false);

    function processRequest(e) {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
            var city = response.city;
          
            document.getElementById('currentCity').innerHTML = city;
            return;
        }
    }
 
    
}

function getCityInput(){
    

    var cityInput = document.querySelector('#cityInput').value;
    const apiKey = "AIzaSyBJIfWlMAvphaIoOrrMGYm_pIFs3DkCafI";
    const apiCityUrl =  "https://maps.googleapis.com/maps/api/geocode/json?address=" + cityInput + "&key=" + apiKey;

    fetch(apiCityUrl)
       .then(response => response.json())
       .then(data =>{
        
        if (data.status === "OK"){
            var searchLat = data.results[0].geometry.location.lat;
            var searchLng = data.results[0].geometry.location.lng;
            var formattedAdress = data.results[0].formatted_address;
            var searchCoordinates = [searchLat, searchLng];
            checkWeather(searchCoordinates);
            document.getElementById("currentCity").innerHTML = formattedAdress;
            document.getElementById("cityInput").value = "";
        }
        if (data.status === "ZERO_RESULTS") {
            console.log(data.status);
            alert(data.status);           
        }
        if (data.status === "INVALID_REQUEST") {
            console.log(data.status);
            alert(data.status);           
        }
        
        
       });

        

       

}


function handle(e){
    if (e.keyCode === 13) {

        e.preventDefault();
        getCityInput();
    }
}


getCoordinates();
