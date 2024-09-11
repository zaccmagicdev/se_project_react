import React from "react";
import "./WeatherCard.css";
import { backgrounds } from "../../utils/constants";

//here we will want to add props to take in the API output
//now how are we going to implement the dynamic cards

function WeatherCard(props) {
  if (props.weather !== "") {
    const background = backgrounds.filter((i) => {
      return i.timeOfDay === props.time && i.weather === props.weather;
    });

    return (
      <div className="weathercard" style={{ background: background[0].color }}>
        <div className="weathercard__container">
          <div className="weathercard__temp">{props.temp}</div>
          <div className="weathercard__information">
            <span className="weathercard__stat">{`UV Index: ${props.uvIndex}`}</span>
            <span className="weathercard__stat">{`Humidity: ${props.humidity}%`}</span>
            <span className="weathercard__stat">{`Wind Direction: ${props.windDir}`}</span>
            <span className="weathercard__stat">{`Wind Speed: ${props.windMph}mph`}</span>
          </div>
        </div>
        {
          <img
            className="weathercard__icon"
            alt="Weathercard Weather"
            src={background[0].url}
          ></img>
        }
      </div>
    );
  }
}

export default WeatherCard;
