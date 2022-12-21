
export const weatherServices = {
    getWeatherData
}

const WEATHER_KEY_API = 'dc74f047c708bd2233ef0ddd2ab75d4c'

function getWeatherData(lat,lon){
    const prm = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_KEY_API}`)
    return prm.then((value) => value.data)
}