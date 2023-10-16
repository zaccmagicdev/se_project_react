import React, { useState } from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import './Main.css';

function Main(props) {

    return (
        <div> 
            <WeatherCard temp="74F" />
            <p>Today is {props.temp}, you may want to wear:</p>
            {props.children}
        </div>
    );
}

export default Main;