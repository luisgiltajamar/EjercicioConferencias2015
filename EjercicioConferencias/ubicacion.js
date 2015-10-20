var ubicacionActual=function(location) {
    var pos = location.coords.latitude + " , " +
        location.coords.longitude;
    var url = "http://maps.googleapis.com/maps/api/staticmap?center=" +
        pos + "&zoom=14&size=400x300&sensor=false";

    document.getElementById("tuUbicacion").src = url;

}
var ubicacionPrefijada = function (latitude,longitude) {
    var pos = latitude + " , " +
        longitude;
    var url = "http://maps.googleapis.com/maps/api/staticmap?center=" +
        pos + "&zoom=14&size=400x300&sensor=false";

    document.getElementById("nuestraUbicacion").src = url;

}
var error=function(err) {
    alert("Error");
}

navigator.geolocation.getCurrentPosition(ubicacionActual, error);
ubicacionPrefijada(37.385267, -122.085387);


