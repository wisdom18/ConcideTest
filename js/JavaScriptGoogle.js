
function initialize() {
    getMap();
    initAutocomplete();
}



var mapToShow;
var placeMarkers = [];
var locationMarker;

function initAutocomplete() {


    // Create the search box and link it to the UI element.
    var input = document.getElementById('address');
    var autocomplete = new google.maps.places.Autocomplete(input);


}
function getMap() {
    deleteMarkers();
    var lttd = parseFloat(document.getElementById('latitude').value.replace(",", "."));
    var lngtd = parseFloat(document.getElementById('longitude').value.replace(",", "."));
    var latlng = new google.maps.LatLng(lttd, lngtd);
    var mapOptions = {
        zoom: 15,
        center: latlng
    };
    mapToShow = new google.maps.Map(document.getElementById('showmap'), mapOptions);
    mapToShow.setCenter(latlng);
    locationMarker = new google.maps.Marker({
        map: mapToShow,
        position: latlng
    });
}

function getCoordinates() {
    deleteMarkers();
    locationMarker.setMap(null);
    var address = document.getElementById('address').value;
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': address }, function (results, status) {
        if (status === 'OK') {

            var loc = results[0].geometry.location;
            mapToShow.setCenter(loc);
            locationMarker = new google.maps.Marker({
                map: mapToShow,
                position: loc
            });
            document.getElementById('latitude').value = loc.lat();
            document.getElementById('longitude').value = loc.lng();

        }
        else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

function setMapOnAll(mapToShow) {
    for (var i = 0; i < placeMarkers.length; i++) {
        placeMarkers[i].setMap(mapToShow);
    }
}

function deleteMarkers() {
    setMapOnAll(null);
    placeMarkers = [];
}

function placeMarker() {
    var lttd = parseFloat(this.getAttribute("data-lat").replace(",", "."));
    var lngtd = parseFloat(this.getAttribute("data-lng").replace(",", "."));
    var latlng = { lat: lttd, lng: lngtd };
    var markerToAdd = new google.maps.Marker({
        position: latlng,
        map: mapToShow,
        title: this.innerText
    });
    markerToAdd.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png')

    placeMarkers.push(locationMarker);
    placeMarkers.push(markerToAdd);
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < placeMarkers.length; i++) {
        bounds.extend(placeMarkers[i].getPosition());
    }
    mapToShow.fitBounds(bounds);
}


//var x = document.getElementById("mylocation");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert('Geocode was not successful for the following reason:');
    }
}

function showPosition(position) {
    //x.innerHTML = "Latitude: " + position.coords.latitude +
    //    "<br>Longitude: " + position.coords.longitude;

    document.getElementById('latitude').value = position.coords.latitude;
    document.getElementById('longitude').value = position.coords.longitude;
}


$(function () {

    //document.getElementById('getmapbycoord').addEventListener('click', function (event) {
    //    //event.preventDefault();
    //    getMap();
    //});

    document.getElementById('getcoordinates').addEventListener('click', function (event) {
        getCoordinates();
    });


    document.getElementById('getLocation').addEventListener('click', function (event) {
        getLocation();
    });


    var names = document.getElementsByClassName('place');
    for (var i = 0; i < names.length; i++) {
        names[i].addEventListener('click', placeMarker.bind(names[i]));
    }
});




