import React from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import './Main.css';
import { defaultClothingItems } from '../../utils/constants';

function Main(props) {

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
        if(item.weather === weatherType){
            return item;
        }
    });

    return (
        <div>
            <WeatherCard temp={props.temp} />
            <p>Today is {props.temp}°F, you may want to wear:</p>
            <ul>
               {filteredCards.map((item, i) => (
                <ItemCard key={i} name={item.name} link={item.link} weather={item.weather} handleCardOpen={props.handleOpenModal} />
               ))}
            </ul>
        </div>
    );
}

export default Main;