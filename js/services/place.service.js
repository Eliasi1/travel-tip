import { storageService } from './async-storage.service.js'

export const placeService = {
    query
}

const API_KEY = 'AIzaSyBzYOvWP9Fcn5o3hqah4fNiufkLax8i_Hg'
const STORAGE_KEY = 'placeDB'

function query() {
    return storageService.query(STORAGE_KEY)
}