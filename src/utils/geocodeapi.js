import { apiKey } from "./constants";
import { processServerResponse } from "./weatherAPI";

async function geocodeapi(city, state, country){
   /* !state ? state = "" : state = state;
    !country ? country = "" : country = country;*/

    return fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`).then(processServerResponse)
}

export default geocodeapi;