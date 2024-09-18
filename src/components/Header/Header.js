import React, { useState, useEffect } from "react";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import headerLogo from "../../images/HeaderLogo.svg";
import profileImage from "../../images/profile-img.jpg";
import "./Header.css";
import { NavLink } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { CurrentThemeContext } from "../../contexts/CurrentThemeContext";
const { flag } = require("country-emoji");

//when the menu is actually open for the modal we can mount it and make it's z index on top

const width = window.screen.width;

function Header(props) {
  const [isMobileMenuOpened, toggleMobileMenu] = useState(false);
  const [mobileModalOpened, toggleModalMenu] = useState(false);
  const { currentUser } = React.useContext(CurrentUserContext);
  let profilePic;

  const { handleWeatherSwitchChange } = React.useContext(
    CurrentTemperatureUnitContext
  );
  const { handleColorThemeChange, theme } =
    React.useContext(CurrentThemeContext);

  if (currentUser !== null) {
    if (currentUser.avatar.length === 0) {
      profilePic = (
        <div className="header__default-img">
          <p className="header__default-initial">{currentUser.name[0]}</p>
        </div>
      );
    } else {
      profilePic = (
        <img
          className="header__profile-icon"
          src={currentUser === null ? "Loading" : currentUser.avatar}
          alt="User Profile Pic"
        />
      );
    }
  }

  useEffect(() => {
    if (width < 710) {
      toggleMobileMenu(true);
    }
  }, []);

  function handleCloseMobileModal() {
    props.handleClick();
    toggleModalMenu(false);
  }

  if (isMobileMenuOpened) {
    return (
      <header className="header">
         <NavLink exact to="/">
            <img
              className="header__button"
              src={headerLogo}
              alt="What to Wear?"
            />
          </NavLink>
        <button
          className="header__button header__mobile-button"
          onClick={() => {
            toggleModalMenu(true);
          }}
        ></button>
        {mobileModalOpened && (
          <div className="header__mobile-menu">
            <button
              className="header__mobile-menu-close-btn"
              onClick={() => {
                toggleModalMenu(false);
              }}
            ></button>
            <div className="header__mobile-container">
            <NavLink exact to="/profile">
              <p className="header__button header__username">
                {currentUser === null ? "Loading..." : currentUser.name}
              </p>
            </NavLink>
            {profilePic}
              <button
                className="header__button header__add-items-bttn"
                onClick={handleCloseMobileModal}
              >
                + Add clothes
              </button>
              <ToggleSwitch
              className="header__toggleswitch__temp"
              label="Celcius?"
              handleCallback={handleWeatherSwitchChange}
            />
            <ToggleSwitch
              className="header__toggleswitch__theme"
              label="Dark?"
              handleCallback={handleColorThemeChange}
            />
            </div>
          </div>
        )}
      </header>
    );
  } else {
    return (
      <header className="header">
        <div className="header__container">
          <NavLink exact to="/">
            <img
              className="header__button"
              src={headerLogo}
              alt="What to Wear?"
            />
          </NavLink>
          <div className="header__info-container">
            <p className="header__date-time">{props.date}</p>
            <div className="header__container">
              <p className="header__date-time">
                {props.location !== ""
                  ? `${props.location}, ${props.region}, ${props.country}`
                  : ""}
              </p>
              <span>{flag(props.country)}</span>
            </div>
          </div>
        </div>
        {props.loggedIn ? (
          <div className="header__container">
            <ToggleSwitch />
            <button
              className="header__button header__add-items-bttn"
              onClick={props.handleGarmentClick}
            >
              + Add clothes
            </button>
            <NavLink exact to="/profile">
              <p className="header__button header__username">
                {currentUser === null ? "Loading" : currentUser.name}
              </p>
            </NavLink>
            {profilePic}
          </div>
        ) : (
          <div className="header__container">
            <ToggleSwitch
              className="header__toggleswitch__temp"
              label="Celcius?"
              handleCallback={handleWeatherSwitchChange}
            />
            <ToggleSwitch
              className="header__toggleswitch__theme"
              label="Dark?"
              handleCallback={handleColorThemeChange}
            />
            <button
              className={`header__button header__button_${theme} header__add-items-bttn`}
              onClick={props.handleSignUpClick}
            >
              Sign up
            </button>
            <button
              className={`header__button header__button_${theme} header__add-items-bttn`}
              onClick={props.handleLogInClick}
            >
              Log in
            </button>
          </div>
        )}
      </header>
    );
  }
}

export default Header;
