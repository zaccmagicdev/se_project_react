'use strict';
//for the resposive design we can make the clothing components a grid
//layout and made the widest components equal the percentage of the
//screens viewwidth

//we will also call our api here for the weather and transfer that info
//via class decentiom

import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import './App.css';
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import weatherAPI from "../../utils/weatherAPI";

function App() {

    //API hooks and functionality hooks
    const [activeModal, setActiveModal] = useState("");
    const [selectedCard, setSelectedCard] = useState({});
    const [temp, setTemp] = useState(0);
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState("");
    const [sunrise, setSunrise] = useState(0);
    const [sunset, setSunset] = useState(0);

    const handleOpenModal = () => {
        setActiveModal("form")
    };

    const handleCloseModal = () => {
        setActiveModal("");
    };

    const selectCard = (card) => {
        setActiveModal("image");
        setSelectedCard(card);
    };

    useEffect(() => {
        weatherAPI().then((res) => {
            setTemp(Math.round(res.main.temp));
            setCity(res.name);
            setWeather(res.weather[0].main);
            setSunrise(res.sys.sunrise);
            setSunset(res.sys.sunset);
        }).catch(err => console.log(err));
    },[]);

    return (
        <div className="App">
            <Header location={city} handleClick={handleOpenModal} />
            <Main temp={temp} weather={weather} handleOpenModal={selectCard} sunrise={sunrise} sunset={sunset}/>
            <Footer />
            {activeModal === "form" && (
                <ModalWithForm title="New Garment" name="clothing" buttonName="Add garment" onClose={handleCloseModal}>
                    <label>
                        Name
                        <input className="clothing__modal-input" placeholder='Name' type="text"></input>
                    </label>
                    <label>
                        Image
                        <input className="clothing__modal-input" placeholder='Image URL' type="url"></input>
                    </label>
                    <label className="clothing__modal-label-radio">
                        Select the weather type:
                        <label className="clothing__modal-radio-name">
                            <input className="clothing__modal-radio-btn" type="radio" name="hot"></input>
                            <span>Hot</span>
                        </label>
                        <label className="clothing__modal-radio-name">
                            <input className="clothing__modal-radio-btn" type="radio" name="warm"></input>
                            <span>Warm</span>
                        </label>
                        <label className="clothing__modal-radio-name">
                            <input className="clothing__modal-radio-btn" type="radio" name="cold"></input>
                            <span>Cold</span>
                        </label>
                    </label>
                </ModalWithForm>
            )}
            {activeModal === "image" && (
                <ItemModal link={selectedCard.link} name={selectedCard.name} temp={selectedCard.weather} onClose={handleCloseModal} />
            )}
        </div>
    );
}

export default App;