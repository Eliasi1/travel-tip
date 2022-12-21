import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'
import { placeService } from './services/place.service.js'

window.onload = onInit
window.onAddMarker = onAddMarker
window.onPanTo = onPanTo
window.onGetLocs = onGetLocs
window.onGetUserPos = onGetUserPos
window.onSelectLocation = onSelectLocation
window.onDeleteLocation = onDeleteLocation
window.onSearch = onSearch

function onInit() {
    mapService.initMap()
        .then(() => {
            console.log('Map is ready')
        })
        .catch(() => console.log('Error: cannot init map'))

    placeService.query()
        .then(console.log)

    mapService.getMap()
        .then(map => {
            console.log(map)
            map.addListener("click", (mapsMouseEvent) => {
                let loc = mapsMouseEvent.latLng.toJSON()
                mapService.addMarker(loc)
                mapService.getLocationName(loc.lat, loc.lng).then((locationName) => {
                    const locObj = { id: null, name: locationName, lat: loc.lat, lng: loc.lng, createdAt: Date.now(), updatedAt: null }
                    placeService.save(locObj)
                        .then(() => {
                            onGetLocs()
                        })
                })
            })
        })
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
            mapService.panTo(pos.coords.latitude, pos.coords.longitude)
            let locObj = { lat: pos.coords.latitude, lng: pos.coords.longitude }
            mapService.addMarker(locObj)
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
                <div class="card" onclick="onSelectLocation(${lat}, ${lng}, '${id}')">
                    <h2 class="name">Name: <span>${name}</span></h2>
                    <button class="loc-remove-btn" onclick="onDeleteLocation('${id}', event)">🗑️</button>
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

function onSelectLocation(lat, lng, id) {
    console.log('lat:', lat)
    console.log('lng:', lng)
    mapService.getLocationName(lat, lng).then((locationName) => {
        document.querySelector(".location-name span").innerText = locationName
    })
    mapService.panTo(lat, lng)
    const locObg = { lat, lng }
    mapService.addMarker(locObg)

}

function onDeleteLocation(id, ev) {
    ev.stopPropagation()
    placeService.remove(id)
        .then(renderLocCards)
}

function onSearch(ev) {
    ev.preventDefault()
    const locationName = document.querySelector('.location-search').value
    mapService.getLocationCoords(locationName)
        .then(cords => {
            const { lat, lng } = cords
            mapService.getLocationName(lat, lng).then((locationName) => {
                mapService.panTo(lat, lng)
                mapService.addMarker(cords)
                const locObj = { id: null, name: locationName, lat, lng, createdAt: Date.now(), updatedAt: null }
                placeService.save(locObj)
                    .then(() => {
                        onGetLocs()
                    })
            })
        })
}