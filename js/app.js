var map;
var markers = [
    { name: 'Van Gogh Museum',  lat: 52.358415900, lng: 4.881075600, website: 'test' },
    { name: 'Cafe De Jaren', lat: 52.368079, lng: 4.895396, website: foursquareAPI("https://api.foursquare.com/v2/venues/4a26ff58f964a5202a7f1fe3?oauth_token=BAK4ZVQY1W3LR244SHG4YROS0B22KPTKC2OTRGEZTEG2GBXA&v=20170904") },
    { name: 'Rijksmuseum', lat: 52.360034188361645, lng: 4.885139465332031, website: foursquareAPI("https://api.foursquare.com/v2/venues/4a270706f964a520bd8c1fe3?oauth_token=BAK4ZVQY1W3LR244SHG4YROS0B22KPTKC2OTRGEZTEG2GBXA&v=20170904") },
    { name: 'Royal Palace Amsterdam', lat: 52.373189, lng: 4.891319, website: foursquareAPI("https://api.foursquare.com/v2/venues/4a270706f964a520bc8c1fe3?oauth_token=BAK4ZVQY1W3LR244SHG4YROS0B22KPTKC2OTRGEZTEG2GBXA&v=20170904") },
    { name: 'Westerpark', lat: 52.386182, lng: 4.877758, website: foursquareAPI("https://api.foursquare.com/v2/venues/4a27071ef964a520ff8c1fe3?oauth_token=BAK4ZVQY1W3LR244SHG4YROS0B22KPTKC2OTRGEZTEG2GBXA&v=20170904") }
  ];

// This block takes care of the click event for the menu
$( "#menu" ).click(function() {
    $( ".list" ).slideToggle( "slow" );
  });

// Api call function for foursquare-data
function foursquareAPI(url) {
    $.getJSON(url).done(function(result){
        console.log(result.response.venue.url);
        return result.response.venue.url;
    }).fail( function(){
        return "Couldn't load data, try again later.";
    })
    };


function AppViewModel() {

    var self = this;

    self.markers = ko.observableArray([
        { name: 'Van Gogh Museum',  lat: 52.358415900, lng: 4.881075600, website: 'test' },
        { name: 'Cafe De Jaren', lat: 52.368079, lng: 4.895396, website: foursquareAPI("https://api.foursquare.com/v2/venues/4a26ff58f964a5202a7f1fe3?oauth_token=BAK4ZVQY1W3LR244SHG4YROS0B22KPTKC2OTRGEZTEG2GBXA&v=20170904") },
        { name: 'Rijksmuseum', lat: 52.360034188361645, lng: 4.885139465332031, website: foursquareAPI("https://api.foursquare.com/v2/venues/4a270706f964a520bd8c1fe3?oauth_token=BAK4ZVQY1W3LR244SHG4YROS0B22KPTKC2OTRGEZTEG2GBXA&v=20170904") },
        { name: 'Royal Palace Amsterdam', lat: 52.373189, lng: 4.891319, website: foursquareAPI("https://api.foursquare.com/v2/venues/4a270706f964a520bc8c1fe3?oauth_token=BAK4ZVQY1W3LR244SHG4YROS0B22KPTKC2OTRGEZTEG2GBXA&v=20170904") },
        { name: 'Westerpark', lat: 52.386182, lng: 4.877758, website: foursquareAPI("https://api.foursquare.com/v2/venues/4a27071ef964a520ff8c1fe3?oauth_token=BAK4ZVQY1W3LR244SHG4YROS0B22KPTKC2OTRGEZTEG2GBXA&v=20170904") }
      ]);

} // End of AppViewModel

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 52.370216, lng: 4.895168},
        zoom: 13
    });

        // Updates the createMarkers function
    function createMarkers(){

        for (var i = 0; i < markers.length; i++) {
            marker = new google.maps.Marker({
            position: new google.maps.LatLng(markers[i].lat, markers[i].lng),
            map: map
            });

            google.maps.event.addListener(marker, 'click', (function(marker, i) {

                var contentString = '<h3 data-bind="text: self.markers()[i].name">' + '</h3>' +
                    '<a href="' + markers[i].website + '">Visit Website!</a>';

                var infowindow = new google.maps.InfoWindow({
                content: contentString
                });

                return function() {
                infowindow.open(map, marker);
                }
            })(marker, i));
            }
    } // End of createMarkers
    createMarkers();


    // Activates knockout.js
    ko.applyBindings(new AppViewModel());
} // End of initMap
