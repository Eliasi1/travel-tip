import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const placeService = {
    query,
    save,
    remove
}

const API_KEY = 'AIzaSyBzYOvWP9Fcn5o3hqah4fNiufkLax8i_Hg'
const STORAGE_KEY = 'placeDB'
_createDemoPlaces()

function query() {
    return storageService.query(STORAGE_KEY)
}

function save(place) {
    if (place.id) {
        return storageService.put(STORAGE_KEY, place)
    } else {
        return storageService.post(STORAGE_KEY, place)
    }
}

function remove(placeId){
    return storageService.remove(STORAGE_KEY, placeId)
}

function _createDemoPlaces() {
    let places = utilService.loadFromStorage(STORAGE_KEY)
    if(!places || !places.length) {
        places = [
            {
                id: 'Daz3T',
                name: '',
                lat: 31.967127,
                lng: 34.839411,
                createdAt: Date.now(),
                updatedAt: null
            },
            {
                id: 'SdP4t',
                name: '',
                lat: 31.967127,
                lng: 34.839411,
                createdAt: Date.now(),
                updatedAt: null
            },
            {
                id: 'Xs5p4',
                name: '',
                lat: 31.967127,
                lng: 34.839411,
                createdAt: Date.now(),
                updatedAt: null
            }
        ]
    }
    utilService.saveToStorage(STORAGE_KEY, places)
}