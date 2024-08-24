
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
import Profile from "../Profile/Profile";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { Switch } from "react-router-dom/cjs/react-router-dom";
import { Route } from 'react-router-dom';
import * as auth from '../../utils/auth';
import * as api from '../../utils/api';
import newWeatherAPI from "../../utils/newweatherapi";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import SearchBar from "../SearchBar/SearchBar";

function App() {

    //API hooks and functionality hooks
    const [, forceUpdate] = React.useReducer(o => !o);
    const [activeModal, setActiveModal] = useState("");
    const [selectedCard, setSelectedCard] = useState({});
    const [temp, setTemp] = useState(0);
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState("");
    const [sunrise, setSunrise] = useState(0);
    const [sunset, setSunset] = useState(0);
    const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState('F');
    const [serverItems, setServerItems] = useState(null);
    const [isLoggedIn, setLogIn] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [searchValue, setSearchValue] = useState("");

    //history object
    const history = useHistory();

    //handlers
    const handleOpenGarmentModal = () => {
        setActiveModal("form")
    };

    const handleOpenLoginModal = () => {
        setActiveModal("login")
    };

    const handleOpenSignUpModal = () => {
        setActiveModal("signup")
    };

    const handleOpenEditProfileModal = () => {
        setActiveModal("edit")
    }

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

    const handleAddItemSubmit = (name, url, weather) => {
        api.uploadItem(name, url, weather, localStorage.getItem("jwt"))
            .then(res => setServerItems([res.data, ...serverItems]))
            .then(() => { handleCloseModal() })
            .catch(err => console.log(err))
    }

    const handleDeleteCard = () => {
        api.deleteItem(selectedCard.id, localStorage.getItem("jwt"))
            .then(() => setServerItems(serverItems.filter((item => item._id !== selectedCard.id))))
            .then(() => handleCloseModal())
            .catch((err) => console.log(err))
    }

    const handleRegistration = (name, avatar, email, password) => {
        auth.register(name, avatar, email, password)
            .then(() => {
                handleCloseModal();
                handleLogin(email, password)
                history.push('/profile');
            }).catch(err => console.log(err))
    };

    const handleLogin = (email, password) => {
        auth.authorize(email, password)
            .then(() => {
                api.checkToken(localStorage.getItem("jwt"))
                    .then((res) => {
                        setCurrentUser(res.data)
                        handleCloseModal();
                        setLogIn(true)
                        history.push('/');
                    })
                    .catch((err) => console.log(err));
            }).catch((err) => console.log(err))
    }

    const handleProfileEdit = (name, avatar) => {
        api.updateInfo(name, avatar, localStorage.getItem("jwt"))
            .then((res) => {
                console.log(res)
                setCurrentUser(res)
            })
            .then(() => { handleCloseModal(); })
            .catch((err) => console.log(err))
    };

    function handleLogOut() {
        localStorage.removeItem("jwt");
        setCurrentUser(null);
        setLogIn(false);
        history.push('/');
    }

    function handleCardLike(card){
        const token = localStorage.getItem("jwt");
        if (card.likes.length === 0 || !card.likes.includes(currentUser._id)) {
            api.likeItem(card.id, token)
                .then((updatedCard) => {
                    setServerItems(serverItems.map(c =>
                        c._id === card.id ? updatedCard.data : c))
                })
                .catch((err) => console.log(err))
        } else {
            api.unlikeItem(card.id, token)
                .then((updatedCard) => {
                    setServerItems(serverItems.map(c =>
                        c._id === card.id ? updatedCard.data : c))
                })
                .catch((err) => console.log(err))
        }
    };

    function handleSearchSubmit(data){
        setSearchValue(data);
        console.log(searchValue)
    }
    
//API Calls
    useEffect(() => {
        api.checkToken(localStorage.getItem("jwt"))
            .then((res) => {
                if (res.data) {
                    setLogIn(true)
                    setCurrentUser(res.data)
                } else {
                    setCurrentUser(null)
                }
            })
            .catch((err) => { console.log(err) })

    }, []);

    useEffect(() => {
        api.getItems()
            .then((res) => {
                setServerItems(res.data)
            })
            .catch((err) => console.log(err))
    }, [])


    //calling apis
    /*useEffect(() => {
        weatherAPI().then((res) => {
            setTemp(Math.round(res.main.temp));
            setCity(res.name);
            setWeather(res.weather[0].main);
            setSunrise(res.sys.sunrise);
            setSunset(res.sys.sunset);
        }).catch(err => console.log(err));
    }, []);*/

    return (
        <div className="App">
            <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
                <CurrentTemperatureUnitContext.Provider
                    value={{ currentTemperatureUnit, handleToggleSwitchChange }}
                >
                    <Header location={city} handleGarmentClick={handleOpenGarmentModal} handleSignUpClick={handleOpenSignUpModal} handleLogInClick={handleOpenLoginModal} loggedIn={isLoggedIn} />
                    <Switch>
                        <Route exact path="/">
                        <SearchBar onData={handleSearchSubmit}/>
                            <Main temp={temp} weather={weather} handleOpenModal={selectCard} sunrise={sunrise} sunset={sunset} cards={serverItems} onCardLike={handleCardLike} />
                        </Route>
                        <ProtectedRoute path="/profile" loggedIn={isLoggedIn}>
                            <Profile handleOpenModal={selectCard} handleLogOut={handleLogOut} cards={serverItems} handleOpenFormModal={handleOpenGarmentModal} handleEditProfile={handleOpenEditProfileModal} onCardLike={handleCardLike} />
                        </ProtectedRoute>
                    </Switch>
                    <Footer />
                    {activeModal === "form" && (
                        <AddItemModal handleCloseModal={handleCloseModal} submitMethod={handleAddItemSubmit} />
                    )}
                    {activeModal === "image" && (
                        <ItemModal link={selectedCard.link} name={selectedCard.name} temp={selectedCard.weather} onClose={handleCloseModal} onDelete={handleDeleteCard} currentCard={selectedCard} />
                    )}
                    {activeModal === "signup" && (
                        <RegisterModal handleCloseModal={handleCloseModal} submitMethod={handleRegistration} handleOpenLogin={handleOpenLoginModal} />
                    )}
                    {activeModal === "login" && (
                        <LoginModal handleCloseModal={handleCloseModal} submitMethod={handleLogin} handleOpenRegistration={handleOpenSignUpModal} />
                    )}
                    {activeModal === "edit" && (
                        <EditProfileModal handleCloseModal={handleCloseModal} submitMethod={handleProfileEdit} name={currentUser.name} avatar={currentUser.avatar}/>
                    )}
                </CurrentTemperatureUnitContext.Provider>
            </CurrentUserContext.Provider>
        </div>
    );
}

export default App;
