function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: { lat: -34.397, lng: 150.644 }
  });
  var geocoder = new google.maps.Geocoder();
  geocodeAddress(geocoder, map);

}
const city = document.getElementById('city').innerHTML
const title = document.getElementById('advert-title').innerHTML
console.log(title);

function geocodeAddress(geocoder, resultsMap) {
  var address = city
  geocoder.geocode({ 'address': address }, function (results, status) {
    if (status === 'OK') {
      resultsMap.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location,
        title,
        label: title
      });
    } else {
      var marker = new google.maps.Marker({
        // map: resultsMap,
        // position: results[0].geometry.location,
        title,
        label: "The family house castle"
      });
    }
  });
}
