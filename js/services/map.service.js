import {placeService} from "./place.service.js"

export const mapService = {
    initMap,
    addMarker,
    panTo,
    getLocationName,
    getMap,
    getLocationCoords
}


// Var that is used throughout this Module (not global)
var gMap
var gMarker
let gSavedRes
const API_KEY = 'AIzaSyBzYOvWP9Fcn5o3hqah4fNiufkLax8i_Hg'

function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap')
    return _connectGoogleApi()
        .then(() => {
            console.log('google available')
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
            gSavedRes(gMap)
            gMarker = new google.maps.Marker({
                position: { lat: lat, lng: lng },
                gMap,
                title: "click to zoom"
            })
        })
}

function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        icon: `../../img/icons/cat-head.png`,
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
    var elGoogleApi = document.createElement('script')
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`
    elGoogleApi.async = true
    document.body.append(elGoogleApi)

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}

function getLocationName(lat,lng){
    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`)
    .then((value) => { return value.json()})
    .then((res)=> res.results[0].formatted_address)
}

function getLocationCoords(locationName){
    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${locationName}&key=${API_KEY}`)
    .then((value) => { return value.json()})
    .then((res)=> res.results[0].geometry.location)
}

function getMap(){
    return new Promise((res, rej) => {
        gSavedRes = res
    })
}