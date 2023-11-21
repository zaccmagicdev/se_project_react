import * as React from 'react';
import ProfileImage from '../../images/profile-img.jpg';
import './Sidebar.css';

function Sidebar(){
    return(
        <div className='sidebar'>
            <img className = "header__profile-icon" src={ProfileImage} alt='Profile Image'/>
            <p className = "header__username">Brock Purdy</p>
        </div>
    )
}

export default Sidebar;