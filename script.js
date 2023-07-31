

async function checkWeather(coordinates){
    lat = coordinates[0];
    lng = coordinates[1];


    const apiUrl = "https://api.open-meteo.com/v1/forecast?latitude=" + lat +"&longitude=" + lng + "&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto";

    const response = await fetch(apiUrl);
    var data = await response.json();

    console.log(data);

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
        console.log("lat:" + lat + "lng:" + lng);
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
            console.log(city);
            document.querySelector('#title').innerHTML = city;
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
        console.log(data);
        if (data.status === "OK"){
            var searchLat = data.results[0].geometry.location.lat;
            var searchLng = data.results[0].geometry.location.lng;
            var formattedAdress = data.results[0].formatted_address;
            var searchCoordinates = [searchLat, searchLng];
            checkWeather(searchCoordinates);
            document.getElementById("title").innerHTML = formattedAdress;
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
