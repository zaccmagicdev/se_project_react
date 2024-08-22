import React from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import weatherAPI from "../../utils/weatherAPI";
import ItemCard from "../ItemCard/ItemCard";
import './Main.css';
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import  geocodeapi  from "../../utils/geocodeapi";

function Main(props) {

    const [searchedCity, setSearchedCity] = React.useState("");
    const [lat, setLat] = React.useState(0);
    const [lon, setLon] = React.useState(0);

    function handleCityChange(e) {
        setSearchedCity(e.target.value);
    }

    function searchCity(city){
        geocodeapi(city).then((res) => {setLat(res.lat); setLon(res.lon)});
        weatherAPI(lat, lon).then(res => console.log(res))
    }

    let filteredCards = [];
    const { currentTemperatureUnit } = React.useContext(CurrentTemperatureUnitContext);

    const timeOfDay = (Date.now() / 1000) >= props.sunrise && (Date.now() / 1000) <= props.sunset
        ? "day" : "night";

    const unitTempInfo = currentTemperatureUnit === 'F' ? `${Math.round(props.temp)}°F` : `${Math.round((props.temp - 32) * 5 / 9)}°C`;

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

    if (props.cards !== null) {
        filteredCards = props.cards.filter((item) => {
            if (item.weather === weatherType) {
                return item;
            }
        });
    }

    return (
        <main className="main__container">
            <form className="main__city-look-up" onSubmit={function(e){e.preventDefault(); searchCity(searchedCity)}}>
                <label for="city-lookup-input">
                    <input required type="text" id="city-lookup-input" onChange={handleCityChange} />
                </label>
                <button className="main__input-submit" type="submit"/>
            </form>
            <WeatherCard temp={unitTempInfo} time={timeOfDay} weather={props.weather} />
            <p>It is currently {unitTempInfo}, you may want to wear:</p>
            {props.cards !== null &&
                <ul>
                    {filteredCards.map((item, i) => (
                        <ItemCard key={i} name={item.name} link={item.imageUrl} weather={item.weather} handleCardOpen={props.handleOpenModal} id={item._id} owner={item.owner} onCardLike={props.onCardLike} likes={item.likes} />
                    ))}
                </ul>}
        </main>
    );

}

export default Main;