import { storageService } from './async-storage.service.js'

export const placeService = {
    query,
    save
}

const API_KEY = 'AIzaSyBzYOvWP9Fcn5o3hqah4fNiufkLax8i_Hg'
const STORAGE_KEY = 'placeDB'

function query() {
    return storageService.query(STORAGE_KEY)
}

function save(place){
    if(place.id){
        return storageService.put(STORAGE_KEY, place)
    } else {
        return storageService.post(STORAGE_KEY, place)
    }
}