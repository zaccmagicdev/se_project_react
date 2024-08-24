import { newApiKey } from "./constants"
import { _processServerResponse } from "./constants"

async function newWeatherAPI(search){
    return fetch(`http://api.weatherapi.com/v1/current.json?key=${newApiKey}&q=${search}aqi=no`).then(_processServerResponse);
}

export default newWeatherAPI;