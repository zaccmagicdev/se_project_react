import * as React from 'react';
import profileImage from '../../images/profile-img.jpg';
import './Sidebar.css';

function Sidebar(){
    return(
        <div className='sidebar'>
            <img className = "header__profile-icon" src={profileImage} alt='User Profile Pic'/>
            <p className = "header__username">Brock Purdy</p>
        </div>
    )
}

export default Sidebar;