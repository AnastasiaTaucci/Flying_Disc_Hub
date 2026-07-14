"use strict";

let locationInfo = document.getElementById("location-info");
let mapDisplay = document.getElementById("map");

window.addEventListener("load", DeviceInfo);

//device data
let deviceData = [
    {label: "Language", value: navigator.language},
    {label: "Browser and platform", value: navigator.userAgent},
    {label: "Online Status", value: navigator.onLine ? "You’re online and ready to go!" : "Oops, it looks like you’re offline."},
    {label: "Total Screen Resolution", value: `Your screen rocks a resolution of ${screen.width} x  ${screen.height} pixels.`},
    {label: "Available Screen Resoultion", value: `There’s ${screen.availWidth} x ${screen.availHeight} pixels of screen space available for use.`},
];

// callback function to show device data
function DeviceInfo() {
    let infoDisplayed = document.querySelector("ul.device-info");

    deviceData.forEach((currentItem) => {
        let infoDisplayedItem = document.createElement("li");
        infoDisplayedItem.innerHTML = "<strong>" + currentItem.label + "</strong>: " + currentItem.value;
        infoDisplayed.appendChild(infoDisplayedItem);
    })

    initMap();
}

// map section

//get user location
document.getElementById("get-location").addEventListener("click", function() {
    navigator.geolocation.getCurrentPosition(locationSuccess, locationFail);

    function locationSuccess(position) {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        let alt = position.coords.altitude;
        let myPosition = {lat: lat, lng: lon};

        let mapOpt = {
            zoom: 11,
            center: myPosition
        }
        
        myMap(mapOpt, myPosition);

        let locationInfoText = "<strong>Location: </strong> You’re at Latitude  " + lat + ", Longitude " + lon;
        if(alt) {
            locationInfoText += ", Altitude " + alt;
        }
        locationInfoText += ". Pretty cool, huh?"
        locationInfo.innerHTML = locationInfoText;        
    }

    function locationFail(error) {
        locationInfo.textContent = `Unable to get location. Error code: ${error.code}. Reason: ${error.message}.`;
    }

    
})

//create map
function initMap() {
    new google.maps.Map(mapDisplay, {zoom: 10, center: {lat: 47.6062, lng: -122.3321}});
}

// creating personalized map based on location
function myMap(mapOpt, myPoistion) {
    let myMap = new google.maps.Map(mapDisplay, mapOpt);
    new google.maps.Marker({
        position: myPoistion,
        map: myMap,
        title: "Your Location"
    })
}