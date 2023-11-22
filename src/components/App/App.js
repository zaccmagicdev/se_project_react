
//for the resposive design we can make the clothing components a grid
//layout and made the widest components equal the percentage of the
//screens viewwidth

//we will also call our api here for the weather and transfer that info
//via class decentiom

import React, { useEffect, useState,useMemo } from "react";
import Header from "../Header/Header";
import './App.css';
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import weatherAPI from "../../utils/weatherAPI";
import Profile from "../Profile/Profile";
import { CurrentTemperatureUnitContext} from "../../contexts/CurrentTemperatureUnitContext";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";
import { Switch } from "react-router-dom/cjs/react-router-dom";
import {Route} from 'react-router-dom';
import Api from "../../utils/Api";

function App() {

    //API hooks and functionality hooks
    const [activeModal, setActiveModal] = useState("");
    const [selectedCard, setSelectedCard] = useState({});
    const [temp, setTemp] = useState(0);
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState("");
    const [sunrise, setSunrise] = useState(0);
    const [sunset, setSunset] = useState(0);
    const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState('F');
    const [serverItems, setServerItems] = useState([]);

    //calling our own api
    const api = new Api({
        headers: {
            'Content-Type': 'application/json',
        }
    });

    
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

    const handleToggleSwitchChange = () => {
        currentTemperatureUnit === 'F'
          ? setCurrentTemperatureUnit('C')
          : setCurrentTemperatureUnit('F');
      };
    
    const handleAddItemSubmit = (name, link, weather) => {
        api.addItem(name, link, weather)
        .then(res => setServerItems([res, ...serverItems]))
        .catch(err => console.log(err))
        .finally(setActiveModal(""));
    }

    const handleDeleteCard = () => {
        api.deleteItem(selectedCard.id)
        .then(setServerItems(serverItems.filter((item => item._id !== selectedCard.id))))
        .catch(err => console.log(err))
        .finally(setActiveModal(""));
    }

    useEffect(() => {
        api.getItems()
        .then(res => setServerItems(res))
        .catch(err => console.log(err))
    }, []);

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
        <BrowserRouter>
            <div className="App">
                <CurrentTemperatureUnitContext.Provider
                    value={{currentTemperatureUnit, handleToggleSwitchChange}}
                >
                    <Header location={city} handleClick={handleOpenModal} />
                    <Switch>
                    <Route exact path ="/">
                        <Main temp={temp} weather={weather} handleOpenModal={selectCard} sunrise={sunrise} sunset={sunset} cards={serverItems}/>
                    </Route>
                    <Route path ="/profile">
                        <Profile handleOpenModal={selectCard} cards={serverItems} handleOpenFormModal={handleOpenModal}/>
                    </Route>
                    </Switch>
                    <Footer />
                    {activeModal === "form" && (
                        <AddItemModal handleCloseModal={handleCloseModal} submitMethod={handleAddItemSubmit}></AddItemModal>
                    )}
                    {activeModal === "image" && (
                        <ItemModal link={selectedCard.link} name={selectedCard.name} temp={selectedCard.weather} onClose={handleCloseModal} onDelete={handleDeleteCard}/>
                    )}
                </CurrentTemperatureUnitContext.Provider>
            </div>
        </BrowserRouter>
    );
}

export default App;