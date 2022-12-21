export const mapService = {
    initMap,
    addMarker,
    panTo
}


// Var that is used throughout this Module (not global)
var gMap
var gMarker

function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap')
     _connectGoogleApi()
        .then(() => {
            console.log('google available')
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
            gMarker = new google.maps.Marker({
                position: {lat: lat, lng:lng},
                gMap,
                title: "click to zoom"
            })
            
            console.log('Map!', gMap)
        })
        .then(()=>{
        gMap.addListener("center_changed", () => {
            // 3 seconds after the center of the map has changed, pan back to the
            // marker.
            window.setTimeout(() => {
                gMap.panTo(gMarker.getPosition());
            }, 3000);
          });
        gMarker.addListener("click", () => {
            gMap.setZoom(8);
            gMap.setCenter(gMarker.getPosition());
          });
        }
        )
}

function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'Hello World!'
    })
    return marker
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng)
    gMap.panTo(laLatLng)
}


function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyBzYOvWP9Fcn5o3hqah4fNiufkLax8i_Hg'
    var elGoogleApi = document.createElement('script')
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`
    elGoogleApi.async = true
    document.body.append(elGoogleApi)

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}