import React, { useState, useEffect } from 'react';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import HeaderLogo from '../../images/HeaderLogo.svg';
import ProfileImage from '../../images/profile-img.jpg';
import './Header.css';

//when the menu is actually open for the modal we can mount it and make it's z index on top

const width = window.screen.width;

function Header(props){

    const [isMobileMenuOpened, toggleMobileMenu] = useState(false);
    const [mobileModalOpened, toggleModalMenu] = useState(false);

    const currentDate = new Date().toLocaleString('default', { month: 'long', day: 'numeric' });
    useEffect(() => {
        if(width < 710){
            toggleMobileMenu(true);
        }
    }, []);

    function handleCloseMobileModal(){
        props.handleClick();
        toggleModalMenu(false);
    }

    if(isMobileMenuOpened){
        return (
            <div className='header'>
                <img src={HeaderLogo} alt='What to Wear?'/>
                <button className="header__mobile-button" onClick={() => {toggleModalMenu(true)}}></button>
                {mobileModalOpened && (
                    <div className='header__mobile-menu'>
                        <button className='header__mobile-menu-close-btn' onClick={() => {toggleModalMenu(false)}}></button>
                        <div className='header__mobile-container'>
                            <p className = "header__username">Brock Purdy</p>
                            <img className = "header__profile-icon" src={ProfileImage} alt='Profile Image'/>
                            <button className = "header__add-items-bttn" onClick={handleCloseMobileModal}>+ Add clothes</button>
                        </div>
                    </div>
                )}
            </div>
        );
    } else {
        return (
        <div className = "header">
            <div className='header__container'>
                <img src={HeaderLogo} alt='What to Wear?'/>
                <p className = "header__date-time">{currentDate}, {props.location}</p>
            </div>
            <div className = 'header__container'>
                <ToggleSwitch />
                <button className = "header__add-items-bttn" onClick={props.handleClick}>+ Add clothes</button>
                <p className = "header__username">Brock Purdy</p>
                <img className = "header__profile-icon" src={ProfileImage} alt='Profile Image'/>
            </div>
        </div>
        );
    }
}

export default Header;
