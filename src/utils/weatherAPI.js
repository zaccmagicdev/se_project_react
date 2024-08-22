import { apiKey } from "./constants";

export const processServerResponse = (res) => { 
    if (res.ok) { 
      return res.json(); 
    } 
    return Promise.reject(`Error: ${res.status}`); 
}

async function weatherAPI(lat, lon) {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`)
        .then(processServerResponse);
}

export default {weatherAPI, processServerResponse};