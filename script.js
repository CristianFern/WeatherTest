

async function checkWeather(coordinates){
    
    lat = coordinates[0];
    lng = coordinates[1];


    const apiUrl = "https://api.open-meteo.com/v1/forecast?latitude=" + lat +"&longitude=" + lng + "&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto&current_weather=true";

    const response = await fetch(apiUrl);
    var data = await response.json();

    console.log(data);

    document.getElementById("currentTemperature").innerHTML = data.current_weather.temperature + "°C";

    

    let localTimeDate = data.current_weather.time.slice(8,10) + "/" + data.current_weather.time.slice(5,7) + "/" + data.current_weather.time.slice(0,4);
    let localTime = data.current_weather.time.slice(11,16);
    let currentLocalTime = "Local Time(" + localTimeDate + ", " + localTime + ")";

    document.querySelector("iframe").src = "https://embed.windy.com/embed2.html?lat=" + lat + "&lon=" + lng + "&detailLat=" + lat + "&detailLon=" + lng + "&width=800&height=600&zoom=6&level=surface&overlay=temp&product=ecmwf&menu=&message=&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=default&metricTemp=default&radarRange=-1";

   
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

        weatherCode = data.current_weather.weathercode;
        
      
        let iconSrc = loadIcons(weatherCode);

        document.getElementById("currentWeatherIcon").src = iconSrc;

        
     
   } else if(data.current_weather.is_day === 0){
        //noite
        
        weatherCode = data.current_weather.weathercode;
        
      
        let iconLink = loadIcons(weatherCode);
       
        iconSrc = iconLink.slice( 0,(iconLink.length - 4)) ;

 
        document.getElementById("currentWeatherIcon").src = iconSrc + "_night.png";

   }

   for (let f = 0; f < 6; f++) {

    
    let iconNumber = "day" + f + "Icon";

    weatherCode = data.daily.weathercode[f];

    iconSrc = loadIcons(weatherCode);

    document.getElementById(iconNumber).src = iconSrc;
       
   }


    



    for(i=0 ; i < 6 ; i++){

        daymax = "day" + i + "max";
        daymin = "day"+ i + "min";
        day = "day"+ i ;
        

        document.querySelector("#" + daymax).innerHTML = data.daily.temperature_2m_max[i] + "°C";

        document.querySelector("#" + daymin).innerHTML = data.daily.temperature_2m_min[i] + "°C";


        weekDay = new Date(data.daily.time[i]).toString().slice(0,3);

        document.getElementById("weekday" + i).innerHTML = weekDay;        

        

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

function changeTimespan() {
//por acabar

    if(document.getElementById("timespan-fortnight").style.display=="none"){

        document.getElementById("timespan-weekly").style.display = "none";
        document.getElementById("timespan-fortnight").style.display="flex";
        

    }else if(document.getElementById("timespan-weekly").style.display=="none"){
        document.getElementById("timespan-weekly").style.display = "flex";
        document.getElementById("timespan-fortnight").style.display="none";

    }

}



function loadIcons(weathercode){


    let rawWeatherCode;

    if(weathercode === 0){
        rawWeatherCode =  "icons/clearsky_0.png";
    }
    else if (weathercode === 1) {
        rawWeatherCode = "icons/mainlyClear_1.png";
    }
    else if (weathercode === 2) {
        rawWeatherCode = "icons/partlyClear_2.png";
    }
    else if (weathercode === 3) {
        rawWeatherCode = "icons/overcast_3.png";
    }
    else if (weathercode === 45) {
        rawWeatherCode = "icons/fog_45.png";
    }
    else if (weathercode === 48) {
        rawWeatherCode = "icons/denseFog_48.png";
    }
    else if (weathercode === 51 || weathercode === 53 || weathercode === 55) {
        rawWeatherCode = "icons/drizzle_51_53_55.png";
    }
    else if (weathercode === 61 || weathercode === 63 || weathercode === 65) {
        rawWeatherCode = "icons/rain_61_63_65.png";
    }
    else if (weathercode === 66 || weathercode === 67) {
        rawWeatherCode = "icons/freezingRain_66_67.png";
    }
    else if (weathercode === 71 || weathercode === 73 ||weathercode === 75) {
        rawWeatherCode = "icons/snow_71_73_75.png";
    }
    else if (weathercode === 56 || weathercode === 57 || weathercode === 77) {
        rawWeatherCode = "icons/snowGrains_56_57_77.png";
    }
    else if (weathercode === 80 || weathercode === 81 || weathercode === 82) {
        rawWeatherCode = "icons/rainShower_80_81_82.png";
    }
    else if (weathercode === 85 || weathercode === 86) {
        rawWeatherCode = "icons/snowShower_85_86.png";
    }
    else if (weathercode === 95 || weathercode === 96 || weathercode === 99) {
        rawWeatherCode = "icons/rainShower_80_81_82.png";
    }


    return rawWeatherCode;
}



getCoordinates();
