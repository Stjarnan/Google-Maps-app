var map;
//markers for initmap
var markers = [
    { name: 'Van Gogh Museum',  lat: 52.358415900, lng: 4.881075600, adress: 'Museumplein 6, 1071 DJ Amsterdam'},
    { name: 'Cafe De Jaren', lat: 52.368079, lng: 4.895396, adress: 'Nieuwe Doelenstraat 20, 1012 CP Amsterdam'},
    { name: 'Rijksmuseum', lat: 52.360034188361645, lng: 4.885139465332031, adress: 'Museumstraat 1, 1071 XX Amsterdam'},
    { name: 'Royal Palace Amsterdam', lat: 52.373189, lng: 4.891319, adress: 'Dam, 1012 HG Amsterdam'},
    { name: 'Westerpark', lat: 52.386182, lng: 4.877758, adress: 'Haarlemmerweg 4, 1014 Amsterdam'}
  ];
var markerNum = [];
var initUrls = false;
var res;
var foursquareData = ['0', '1', '2', '3', '4'];
function toggleBounce() {}

function push(index){
    foursquareData[index] = res;
}

// Api call function for foursquare-data
function foursquareAPI(url, index) {
    $.getJSON(url).done(function(result){
        res = result.response.venue.url;
        push(index);
    }).fail( function(){
        return "Couldn't load data, try again later.";
    })
    };

foursquareAPI("https://api.foursquare.com/v2/venues/4a2706faf964a5208c8c1fe3?oauth_token=BAK4ZVQY1W3LR244SHG4YROS0B22KPTKC2OTRGEZTEG2GBXA&v=20170904", 0);
foursquareAPI("https://api.foursquare.com/v2/venues/4a26ff58f964a5202a7f1fe3?oauth_token=BAK4ZVQY1W3LR244SHG4YROS0B22KPTKC2OTRGEZTEG2GBXA&v=20170904", 1);
foursquareAPI("https://api.foursquare.com/v2/venues/4a270706f964a520bd8c1fe3?oauth_token=BAK4ZVQY1W3LR244SHG4YROS0B22KPTKC2OTRGEZTEG2GBXA&v=20170904", 2);
foursquareAPI("https://api.foursquare.com/v2/venues/4a270706f964a520bc8c1fe3?oauth_token=BAK4ZVQY1W3LR244SHG4YROS0B22KPTKC2OTRGEZTEG2GBXA&v=20170904", 3);
foursquareAPI("https://api.foursquare.com/v2/venues/4a27071ef964a520ff8c1fe3?oauth_token=BAK4ZVQY1W3LR244SHG4YROS0B22KPTKC2OTRGEZTEG2GBXA&v=20170904", 4);

function AppViewModel() {

    var self = this;

    function location(name, category, lat, lng, adress, website, markerId) {
        this.name = ko.observable(name);
        this.category = ko.observable(category);
        this.lat = ko.observable(lat);
        this.lng = ko.observable(lng);
        this.adress = ko.observable(adress);
        this.website = ko.observable(website);
        this.markerId = ko.observable(markerId);
      }

    self.data = ko.observableArray();

    setTimeout(function(){
        self.data.push(new location( 'Van Gogh Museum', 'Museum', 52.358415900, 4.881075600, 'Museumplein 6, 1071 DJ Amsterdam', foursquareData[0], 0 ));
        self.data.push(new location( 'Cafe De Jaren', 'Food', 52.368079, 4.895396, 'Nieuwe Doelenstraat 20, 1012 CP Amsterdam', foursquareData[1], 1 ));
        self.data.push(new location( 'Rijksmuseum', 'Museum', 52.360034188361645, 4.885139465332031, 'Museumstraat 1, 1071 XX Amsterdam', foursquareData[2], 2 ));
        self.data.push(new location( 'Royal Palace Amsterdam', 'Sights', 52.373189, 4.891319, 'Dam, 1012 HG Amsterdam', foursquareData[3], 3 ));
        self.data.push(new location( 'Westerpark', 'Outdoors', 52.386182, 4.877758, 'Haarlemmerweg 4, 1014 Amsterdam', foursquareData[4], 4));
    }, 2000)

    self.toggleMenu = function() {
            $( ".list" ).slideToggle( "slow" );
    }

    self.chosenItem = function(item, event){
        $('.itemData').hide();
        markerNum.forEach(function(element) {
            element.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
        });
        $(event.currentTarget).children('.itemData').show();
        var id = $(event.currentTarget).children('.itemData').children('.markerId').text();
        markerNum[id].setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png')

    }

} // End of AppViewModel

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 52.370216, lng: 4.895168},
        zoom: 13
    });

    for (var i = 0; i < markers.length; i++) {
        markerNum[i] = new google.maps.Marker({
        position: new google.maps.LatLng(markers[i].lat, markers[i].lng),
        map: map
        });

        google.maps.event.addListener(markerNum[i], 'click', (function(marker, i) {

            var contentString = '<h3>' + markers[i].name + '</h3>' +
                '<p>Adress: <strong>' + markers[i].adress + '</strong></p>';

            var infowindow = new google.maps.InfoWindow({
            content: contentString
            });

            return function() {
            infowindow.open(map, marker);
            }
        })(markerNum[i], i));

        google.maps.event.addListener(markerNum[i], 'click', (function(marker, i) {

            return function(){
                for (var j = 0; j < markerNum.length; j++) {
                    markerNum[j].setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
                  }
                markerNum[i].setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png')
            }

        })(markerNum[i], i));
    }
} // End of initMap

// Activates knockout.js
ko.applyBindings(new AppViewModel());
