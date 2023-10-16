import React from "react";
import './WeatherCard.css'

//here we will want to add props to take in the API output
function WeatherCard(props){
   return(
    <div className="weathercard">
        <div className="weathercard__temp">{props.temp}</div>
    </div>
   );    
}

export default WeatherCard;