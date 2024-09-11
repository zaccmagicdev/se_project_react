import { newApiKey, _processServerResponse, baseUrl } from "./constants"

export async function newWeatherAPI(search){
    return fetch(baseUrl + `current.json?key=${newApiKey}&q=${search}&aqi=no`).then(_processServerResponse);
}
