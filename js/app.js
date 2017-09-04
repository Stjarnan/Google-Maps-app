// Google Map

var map;

var markers = [
    { name: 'EYE Film Museum',  lat: 52.384349, lng: 4.900761 },
    { name: 'Cafe De Jaren', lat: 52.368079, lng: 4.895396 },
    { name: 'Rijksmuseum', lat: 52.360034188361645, lng: 4.885139465332031 },
    { name: 'Royal Palace Amsterdam', lat: 52.373189, lng: 4.891319 },
    { name: 'Westerpark', lat: 52.386182, lng: 4.877758 }
  ];

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 52.370216, lng: 4.895168},
    zoom: 13
  });

  for (i = 0; i < markers.length; i++) {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(markers[i].lat, markers[i].lng),
      map: map
    });

    google.maps.event.addListener(marker, 'click', (function(marker, i) {

        var contentString = '<h3>' + markers[i].name + '</h3>';

        var infowindow = new google.maps.InfoWindow({
        content: contentString
        });

        return function() {
          infowindow.open(map, marker);
        }
      })(marker, i));
    }

}
