import { newApiKey, _processServerResponse, baseUrl } from "./constants"

export async function newWeatherAPI(search){
    console.log(baseUrl + `current.json?key=${newApiKey}&q=${search}&aqi=no`)
    return fetch(baseUrl + `current.json?key=${newApiKey}&q=${search}&aqi=no`).then(_processServerResponse);
}

export async function getAstronomy(search, dateTime){
    return fetch(baseUrl + `astronomy.json?key=${newApiKey}&q=${search}&dt=${dateTime}`).then(_processServerResponse);
}


