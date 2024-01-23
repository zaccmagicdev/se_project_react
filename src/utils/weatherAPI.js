import { apiKey } from "./constants";

export const processServerResponse = (res) => { 
    if (res.ok) { 
      return res.json(); 
    } 
    return Promise.reject(`Error: ${res.status}`); 
}

async function weatherAPI() {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=32.71536&lon=-117.1573&units=imperial&appid=${apiKey}`)
        .then(processServerResponse);
}

export default weatherAPI;