
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
import * as auth from '../../auth';
import EditProfileModal from "../EditProfileModal/EditProfileModal";

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
    const [serverItems, setServerItems] = useState(null);
    const [isLoggedIn, setLogIn] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    //history object
    let history = useHistory();

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

    const handleCardUpdate = () => {
        auth.getItems()
        .then(res => setServerItems(res.data))
        .then(() => handleCloseModal())
        .catch(err => console.log(err))
    };

    const handleToggleSwitchChange = () => {
        currentTemperatureUnit === 'F'
            ? setCurrentTemperatureUnit('C')
            : setCurrentTemperatureUnit('F');
    };

    const handleAddItemSubmit = (name, url, weather) => {
        auth.uploadItem(name, url, weather, localStorage.getItem("jwt"))
        .then(() => {
            handleCardUpdate();
        })
        .catch(err => console.log(err))
    }

    const handleDeleteCard = () => {
        auth.deleteItem(selectedCard.id, localStorage.getItem("jwt"))
        .then(() => {
           handleCardUpdate();
        })
    }

    const handleRegistration = (name, avatar, email, password) => {
        auth.register(name, avatar, email, password)
            .then((res) => {
                handleCloseModal();
                handleLogin(email, password)
                history.push('/profile');
                console.log(res);
            }).catch(err => console.log(err))
    };

    const handleLogin = (email, password) => {
        auth.authorize(email, password)
            .then(() => {
                auth.currentUser(localStorage.getItem("jwt"))
                    .then((res) => {
                        setCurrentUser(res)
                        handleCloseModal();
                        setLogIn(true)
                        history.push('/');
                    })
                    .catch((err) => console.log(err));
            })
    }

    const handleProfileEdit = (name, avatar) => {
        auth.updateInfo(name, avatar, localStorage.getItem("jwt"))
            .then((res) => {
                currentUser.data.name = res.name;
                currentUser.data.avatar = res.avatar;
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

    const handleCardLike = ({ id, isLiked }) => {
        const token = localStorage.getItem("jwt");
        // Check if this card is now liked
        isLiked
          ? // if so, send a request to add the user's id to the card's likes array
            auth
              // the first argument is the card's id
              .likeItem(id, token)
              .then((updatedCard) => {
                setServerItems((cards) =>
                  cards.map((c) => (c._id === id ? updatedCard : c))
                );
              })
              .catch((err) => console.log(err))
          : // if not, send a request to remove the user's id from the card's likes array
            auth
              // the first argument is the card's id
              .unlikeItem(id, token) 
              .then((updatedCard) => {
                setServerItems((cards) =>
                  cards.map((c) => (c._id === id ? updatedCard : c))
                );
              })
              .catch((err) => console.log(err));
      }; 

    useEffect(() => {
        auth.currentUser(localStorage.getItem("jwt"))
            .then((res) => {
                if (res.data) {
                    setLogIn(true)
                }
                setCurrentUser(res)
            })
            .catch((err) => { console.log(err) })

    }, []);

    useEffect(() => {
        auth.getItems()
            .then((res) => {
                setServerItems(res.data)
                console.log(res.data)
            })
            .catch((err) => console.log(err))
    }, [])

    //calling apis
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
                    <Header location={city} handleGarmentClick={handleOpenGarmentModal} handleSignUpClick={handleOpenSignUpModal} handleLogInClick={handleOpenLoginModal} loggedIn={isLoggedIn} />
                    <Switch>
                        <Route exact path="/">
                            <Main temp={temp} weather={weather} handleOpenModal={selectCard} sunrise={sunrise} sunset={sunset} cards={serverItems} />
                        </Route>
                        <ProtectedRoute path="/profile" loggedIn={isLoggedIn}>
                            <Profile handleOpenModal={selectCard} handleLogOut={handleLogOut} cards={serverItems} handleOpenFormModal={handleOpenGarmentModal} handleEditProfile={handleOpenEditProfileModal} />
                        </ProtectedRoute>
                    </Switch>
                    <Footer />
                    {activeModal === "form" && (
                        <AddItemModal handleCloseModal={handleCloseModal} submitMethod={handleAddItemSubmit} />
                    )}
                    {activeModal === "image" && (
                        <ItemModal link={selectedCard.link} name={selectedCard.name} temp={selectedCard.weather} onClose={handleCloseModal} onDelete={handleDeleteCard} currentCard={selectedCard}/>
                    )}
                    {activeModal === "signup" && (
                        <RegisterModal handleCloseModal={handleCloseModal} submitMethod={handleRegistration} handleOpenLogin={handleOpenLoginModal} />
                    )}
                    {activeModal === "login" && (
                        <LoginModal handleCloseModal={handleCloseModal} submitMethod={handleLogin} handleOpenRegistration={handleOpenSignUpModal} />
                    )}
                    {activeModal === "edit" && (
                        <EditProfileModal handleCloseModal={handleCloseModal} submitMethod={handleProfileEdit} />
                    )}
                </CurrentTemperatureUnitContext.Provider>
            </CurrentUserContext.Provider>
        </div>
    );
}

export default App;