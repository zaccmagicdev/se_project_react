import { newApiKey } from "./constants"
import { _processServerResponse } from "./constants"

async function newWeatherAPI(search){
    const url = `http://api.weatherapi.com/v1/current.json?key=${newApiKey}&q=${search}&aqi=no`;
    return fetch(url).then(_processServerResponse);
}

export default newWeatherAPI;