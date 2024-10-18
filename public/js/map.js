
mapboxgl.accessToken = mapToken;

// TO MAKE THE MAP APPEAR YOU MUST
// ADD YOUR ACCESS TOKEN FROM
// https://account.mapbox.com

const map = new mapboxgl.Map({
    container: 'map', // container ID
    center: [77.209, 28.6139], // starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 9 // starting zoom
});

const marker = new mapboxgl.Marker({color : "red"})
.setLngLat(listing.geometry.coordinates)         // listing.geometry.coordinates
.setPopup(new mapboxgl.Popup({offset: 25}).setHTML(
    '<h4>${listing.title}</h4><p>Exect location will be provided after booking</p>'
)
)
.addTo(map);