import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'
import { placeService } from './services/place.service.js'

window.onload = onInit
window.onAddMarker = onAddMarker
window.onPanTo = onPanTo
window.onGetLocs = onGetLocs
window.onGetUserPos = onGetUserPos
window.onSelectLocation = onSelectLocation

function onInit() {
    mapService.initMap()
        .then(() => {
            console.log('Map is ready')
        })
        .catch(() => console.log('Error: cannot init map'))

    placeService.query()
        .then(console.log)
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos')
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onAddMarker() {
    console.log('Adding a marker')
    mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 })
}

function onGetLocs() {
    placeService.query().then(locs => {
        renderLocCards(locs)
    })
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords)
            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
        })
        .catch(err => {
            console.log('err!!!', err)
        })
}
function onPanTo() {
    console.log('Panning the Map')
    mapService.panTo(35.6895, 139.6917)
}

function renderLocCards(value) {
    const strHTML = value.map((location) => {
        const { id, name, lat, lng, createdAt, updatedAt } = location
        return `
                <div class="card" onclick="onSelectLocation(${lat}, ${lng}, ${id})">
                    <h2 class="name">Name: <span>${name}</span></h2>
                    <button class="loc-remove-btn" onclick="onDeleteLocation(${id})">🗑️</button>
                    <div class="location-info flex space-between">
                        <h3 class="lat">Lat: <span>${lat}</span></h3>
                        <h3 class="lng">Lng: <span>${lng}</span></h3>
                    </div>
                    <h3 class="createdAt">created At: <span>${createdAt}</span></h3>
                    <h3 class="updatedAt">updated At: <span>${updatedAt}</span></h3>
                </div>
                `
    }
    ).join("")
    document.querySelector('.table').innerHTML = strHTML


}

function onSelectLocation(locObj){
    console.log(locObj)
}


function onSelectLocation(locObj) {
    console.log(locObj)
}