import React from 'react';
import HeaderLogo from '../../images/HeaderLogo.svg';
import ProfileImage from '../../images/profile-img.jpg';
import './Header.css';

function Header(){

    const currentDate = new Date().toLocaleString('default', { month: 'long', day: 'numeric' });
  
    return(
        <div className = "header">
            <div className='header__container'>
                <img src={HeaderLogo} alt='What to Wear?'/>
                <p className = "header__date-time">{currentDate}, San Diego</p>
            </div>
            <div className = 'header__container'>
                <button className = "header__add-items-bttn">+ Add clothes</button>
                <p className = "header__username">Brock Purdy</p>
                <img className = "header__profile-icon" src={ProfileImage} alt='Profile Image'/>
            </div>
        </div>
    );
}

export default Header;