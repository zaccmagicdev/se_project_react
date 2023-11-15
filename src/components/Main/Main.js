import React from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import './Main.css';
import { defaultClothingItems } from '../../utils/constants';
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function Main(props) {

    const {currentTemperatureUnit} = React.useContext(CurrentTemperatureUnitContext);

    const timeOfDay = (Date.now() / 1000) >= props.sunrise && (Date.now() / 1000) <= props.sunset
        ? "day" : "night";

    const unitTempInfo = currentTemperatureUnit === 'F' ? `${Math.round(props.temp)}°F` : `${Math.round((props.temp - 32) * 5/9)}°C`; 

    function getWeatherType(temperature) {
        if (temperature >= 86) {
            return 'hot';
        } else if (temperature >= 66 && temperature <= 85) {
            return 'warm';
        } else if (temperature <= 65) {
            return 'cold';
        }
    }

    const weatherType = getWeatherType(props.temp);

    const filteredCards = defaultClothingItems.filter((item) => {
        if (item.weather === weatherType) {
            return item;
        }
    });

    return (
        <div>
            <WeatherCard temp={unitTempInfo} time={timeOfDay} weather={props.weather} />
            <p>It is currently {unitTempInfo}, you may want to wear:</p>
            <ul>
                {filteredCards.map((item, i) => (
                    <ItemCard key={i} name={item.name} link={item.link} weather={item.weather} handleCardOpen={props.handleOpenModal} />
                ))}
            </ul>
        </div>
    );

}

export default Main;