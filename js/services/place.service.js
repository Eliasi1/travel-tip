import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const placeService = {
    query,
    save
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

function _createDemoPlaces() {
    const places = [
        {
            id: '',
            name: '',
            lat: 31.967127,
            lng: 34.839411,
            createdAt: Date.now(),
            updatedAt: null
        },
        {
            id: '',
            name: '',
            lat: 31.967127,
            lng: 34.839411,
            createdAt: Date.now(),
            updatedAt: null
        },
        {
            id: '',
            name: '',
            lat: 31.967127,
            lng: 34.839411,
            createdAt: Date.now(),
            updatedAt: null
        }
    ]
    utilService.saveToStorage(STORAGE_KEY, places)
}