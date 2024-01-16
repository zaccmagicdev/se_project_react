import * as React from 'react';
import './Sidebar.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Sidebar(props){

    const {currentUser} = React.useContext(CurrentUserContext)

    return(
        <div className='sidebar'>
            <div className='sidebar__profile-info'>
                <img className = "header__profile-icon" src={currentUser.data.avatar} alt='User Profile Pic'/>
                <p className = "header__username">{currentUser.data.name}</p>
            </div>
            <button className='sidebar__button'>Change Profile Data</button>
            <button className='sidebar__button' onClick={props.handleLogOut}>Log out</button>
        </div>
    )
}

export default Sidebar;