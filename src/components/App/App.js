
//for the resposive design we can make the clothing components a grid
//layout and made the widest components equal the percentage of the
//screens viewwidth

//we will also call our api here for the weather and transfer that info
//via class decentiom

import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Header from "../Header/Header";
import './App.css';
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import weatherAPI from "../../utils/weatherAPI";
import Profile from "../Profile/Profile";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { Switch } from "react-router-dom/cjs/react-router-dom";
import { Route } from 'react-router-dom';
import { api } from "../../utils/Api";
import * as auth from '../../auth';

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
    const [isLoggedIn, setLogIn] = useState(false);
    const [currentUser, setCurrentUser] = useState({});

    //history object
    let history = useHistory();

    //handlers
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
            .then(() => { handleCloseModal() })
            .catch(err => console.log(err));
    }

    const handleDeleteCard = () => {
        api.deleteItem(selectedCard.id)
            .then(() => setServerItems(serverItems.filter((item => item._id !== selectedCard.id))))
            .then(() => { handleCloseModal() })
            .catch(err => console.log(err));
    }

    const handleRegistration = (name, avatar, email, password) => {
        auth.register(name, avatar, email, password)
            .then(() => {
                handleCloseModal();
                handleLogin(email, password)
                //this will be the code for when we can log in

            }).catch(err => console.log(err))
    };

    const handleLogin = (email, password) => {
        auth.authorize(email, password)
            .then(() => {
                setLogIn(true)
            })
    }

    useEffect(() => {
        auth.currentUser(localStorage.getItem("jwt"))
            .then((res) => setCurrentUser(res))
            .then(() => setLogIn(true))
            .catch((err) => { console.log(err) })
    }, []);

    //calling apis
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
    }, []);

    return (
        <div className="App">
            <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
                <CurrentTemperatureUnitContext.Provider
                    value={{ currentTemperatureUnit, handleToggleSwitchChange }}
                >
                    <Header location={city} handleClick={handleOpenModal} />
                    <Switch>
                        <Route exact path="/">
                            <Main temp={temp} weather={weather} handleOpenModal={selectCard} sunrise={sunrise} sunset={sunset} cards={serverItems} />
                        </Route>
                        <ProtectedRoute path="/profile" loggedIn={isLoggedIn}>
                            <Profile handleOpenModal={selectCard} cards={serverItems} handleOpenFormModal={handleOpenModal} />
                        </ProtectedRoute>
                    </Switch>
                    <Footer />
                    {activeModal === "form" && (
                        //<AddItemModal handleCloseModal={handleCloseModal} submitMethod={handleAddItemSubmit}></AddItemModal>
                        <RegisterModal handleCloseModal={handleCloseModal} submitMethod={handleRegistration} />
                        //<LoginModal handleCloseModal={handleCloseModal} submitMethod={handleLogin}/>
                    )}
                    {activeModal === "image" && (
                        <ItemModal link={selectedCard.link} name={selectedCard.name} temp={selectedCard.weather} onClose={handleCloseModal} onDelete={handleDeleteCard} />
                    )}
                </CurrentTemperatureUnitContext.Provider>
            </CurrentUserContext.Provider>
        </div>
    );
}

export default App;