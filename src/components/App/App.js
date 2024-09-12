//for the resposive design we can make the clothing components a grid
//layout and made the widest components equal the percentage of the
//screens viewwidth

//we will also call our api here for the weather and transfer that info
//via class decentiom

import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Header from "../Header/Header";
import "./App.css";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import Profile from "../Profile/Profile";
import { defaultClothingItems } from "../../utils/constants";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { CurrentThemeContext } from "../../contexts/CurrentThemeContext";
import { Switch } from "react-router-dom/cjs/react-router-dom";
import { Route } from "react-router-dom";
import * as auth from "../../utils/auth";
import * as api from "../../utils/api";
import { newWeatherAPI} from "../../utils/newweatherapi";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import SearchBar from "../SearchBar/SearchBar";

function App() {
  //API hooks and functionality hooks
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("");
  const [weather, setWeather] = useState("");
  const [DayTimeValue, setDayTimeValue] = useState(0);
  const [uv, setUv] = useState('');
  const [humidity, setHumidity] = useState('');
  const [wind_dir, setWind_dir] = useState('');
  const [wind_mph, setWind_mph] = useState('');
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [serverItems, setServerItems] = useState(null);
  const [isLoggedIn, setLogIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchResult, setSearchResult] = useState([{}]);
  const [searchMade, handleSearchMade] = useState(false);
  const [theme, setTheme] = useState("light");
  const [err, setErr] = useState('');

  //history object
  const history = useHistory();

  //date moved to global variable
  const currentDate = new Date();
  console.log(currentDate);

  //handlers
  const handleOpenGarmentModal = () => {
    setActiveModal("form");
  };

  const handleOpenLoginModal = () => {
    setActiveModal("login");
  };

  const handleOpenSignUpModal = () => {
    setActiveModal("signup");
  };

  const handleOpenEditProfileModal = () => {
    setActiveModal("edit");
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  const selectCard = (card) => {
    setActiveModal("image");
    setSelectedCard(card);
  };

  const handleWeatherSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  const handleAddItemSubmit = (name, url, weather) => {
    api
      .uploadItem(name, url, weather, localStorage.getItem("jwt"))
      .then((res) => setServerItems([res.data, ...serverItems]))
      .then(() => {
        handleCloseModal();
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteCard = () => {
    api
      .deleteItem(selectedCard.id, localStorage.getItem("jwt"))
      .then(() =>
        setServerItems(
          serverItems.filter((item) => item._id !== selectedCard.id)
        )
      )
      .then(() => handleCloseModal())
      .catch((err) => console.log(err));
  };

  const handleRegistration = (name, avatar, email, password) => {
    auth
      .register(name, avatar, email, password)
      .then(() => {
        handleCloseModal();
        handleLogin(email, password);
        history.push("/profile");
      })
      .catch((err) => console.log(err));
  };

  const handleLogin = (email, password) => {
    auth
      .authorize(email, password)
      .then(() => {
        api
          .checkToken(localStorage.getItem("jwt"))
          .then((res) => {
            console.log(res);
            setCurrentUser(res.data);
            handleCloseModal();
            setLogIn(true);
            history.push("/");
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  const handleProfileEdit = (name, avatar) => {
    api
      .updateInfo(name, avatar, localStorage.getItem("jwt"))
      .then((res) => {
        console.log(res);
        setCurrentUser(res);
      })
      .then(() => {
        handleCloseModal();
      })
      .catch((err) => console.log(err));
  };

  function handleLogOut() {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
    setLogIn(false);
    history.push("/");
  }

  function handleCardLike(card) {
    const token = localStorage.getItem("jwt");
    if (card.likes.length === 0 || !card.likes.includes(currentUser._id)) {
      api
        .likeItem(card.id, token)
        .then((updatedCard) => {
          setServerItems(
            serverItems.map((c) => (c._id === card.id ? updatedCard.data : c))
          );
        })
        .catch((err) => console.log(err));
    } else {
      api
        .unlikeItem(card.id, token)
        .then((updatedCard) => {
          setServerItems(
            serverItems.map((c) => (c._id === card.id ? updatedCard.data : c))
          );
        })
        .catch((err) => console.log(err));
    }
  }

  function handleSearchSubmit(data) {
    newWeatherAPI(data)
      .then((res) => {
        setSearchResult(res);
        console.log(res)
      })
      .then(() => {
        err !== '' && (setErr(''))
      })
      .catch((e) =>{
        e === 'Error: 400' && (setErr('Please enter a valid location'))
      });
  }

  //functions for temporaily shortening weather responses for my current weathercard system
  function shortenWeather(response) {
    if (
      response.includes("snow") ||
      response.includes("sleet") ||
      response.includes("pellets") ||
      response.includes("freezing")
    ) {
      return "Snow";
    } else if (
      response.includes("rain") ||
      response.includes("shower") ||
      response.includes("drizzle")
    ) {
      return "Rain";
    } else {
      return response;
    }
  }

  function handleColorThemeChange() {
    theme === "light" ? setTheme("dark") : setTheme("light");
  }
  // 10,13
  useEffect(() => {
    if (!(searchResult.length <= 1)) {
      handleSearchMade(true);
      setCity(searchResult.location.name);
      setCountry(searchResult.location.country);
      setRegion(searchResult.location.region);
      setDayTimeValue(searchResult.current.is_day)
      setTemp(searchResult.current.temp_f);
      setWeather(shortenWeather(searchResult.current.condition.text));
      setUv(searchResult.current.uv)
      setHumidity(searchResult.current.humidity)
      setWind_dir(searchResult.current.wind_dir)
      setWind_mph(searchResult.current.wind_mph)
    }
  }, [searchResult]);

  //API Calls
  useEffect(() => {
    api
      .checkToken(localStorage.getItem("jwt"))
      .then((res) => {
        if (res.data) {
          setLogIn(true);
          setCurrentUser(res.data);
        } else {
          setCurrentUser(null);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (currentUser !== null) {
      api
        .getItems()
        .then((res) => {
          setServerItems(res.data);
        })
        .catch((err) => console.log(err));
    } else {
      setServerItems(defaultClothingItems);
    }
  }, []);

  return (
    <div className={`App App__${theme}`}>
      <div className="App__Container">
        <CurrentThemeContext.Provider value={{ theme, handleColorThemeChange }}>
          <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
            <CurrentTemperatureUnitContext.Provider
              value={{ currentTemperatureUnit, handleWeatherSwitchChange }}
            >
              <Header
                date={currentDate.toLocaleString("en-us", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                location={city}
                region={region}
                country={country}
                handleGarmentClick={handleOpenGarmentModal}
                handleSignUpClick={handleOpenSignUpModal}
                handleLogInClick={handleOpenLoginModal}
                loggedIn={isLoggedIn}
              />
              <Switch>
                <Route exact path="/">
                  <SearchBar errMessage={err} onData={handleSearchSubmit} />
                  {searchMade && (
                    <Main
                      handleOpenModal={selectCard}
                      temp={temp}
                      dayTimeValue={DayTimeValue}
                      weather={weather}
                      cards={serverItems}
                      onCardLike={handleCardLike}
                      uvIndex={uv}
                      humidity={humidity}
                      windDir={wind_dir}
                      windMph={wind_mph}
                      />
                  )}
                </Route>
                <ProtectedRoute path="/profile" loggedIn={isLoggedIn}>
                  <Profile
                    handleOpenModal={selectCard}
                    handleLogOut={handleLogOut}
                    cards={serverItems}
                    handleOpenFormModal={handleOpenGarmentModal}
                    handleEditProfile={handleOpenEditProfileModal}
                    onCardLike={handleCardLike}
                  />
                </ProtectedRoute>
              </Switch>
              <Footer />
              {activeModal === "form" && (
                <AddItemModal
                  handleCloseModal={handleCloseModal}
                  submitMethod={handleAddItemSubmit}
                />
              )}
              {activeModal === "image" && (
                <ItemModal
                  link={selectedCard.link}
                  name={selectedCard.name}
                  temp={selectedCard.weather}
                  onClose={handleCloseModal}
                  onDelete={handleDeleteCard}
                  currentCard={selectedCard}
                />
              )}
              {activeModal === "signup" && (
                <RegisterModal
                  handleCloseModal={handleCloseModal}
                  submitMethod={handleRegistration}
                  handleOpenLogin={handleOpenLoginModal}
                />
              )}
              {activeModal === "login" && (
                <LoginModal
                  handleCloseModal={handleCloseModal}
                  submitMethod={handleLogin}
                  handleOpenRegistration={handleOpenSignUpModal}
                />
              )}
              {activeModal === "edit" && (
                <EditProfileModal
                  handleCloseModal={handleCloseModal}
                  submitMethod={handleProfileEdit}
                  name={currentUser.name}
                  avatar={currentUser.avatar}
                />
              )}
            </CurrentTemperatureUnitContext.Provider>
          </CurrentUserContext.Provider>
        </CurrentThemeContext.Provider>
      </div>
    </div>
  );
}

export default App;
