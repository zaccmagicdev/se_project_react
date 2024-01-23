import * as React from 'react';
import './SideBar.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function SideBar(props) {

    let profilePic;
    const { currentUser } = React.useContext(CurrentUserContext)

    if (currentUser.avatar.length === 0) {
        profilePic =
            <div className='sidebar__default-img'>
                <p className='sidebar__default-initial'>{currentUser.name[0]}</p>
            </div>
    } else {
        profilePic = <img className="sidebar__profile-icon" src={currentUser === null ? 'Loading' : currentUser.avatar} alt='User Profile Pic' />
    }


    return (
        <div className='sidebar'>
            <div className='sidebar__profile-info'>
                {profilePic}
                <p className="sidebar__username">{currentUser.name}</p>
            </div>
            <button className='sidebar__button' onClick={props.handleEditProfile}>Change Profile Data</button>
            <button className='sidebar__button' onClick={props.handleLogOut}>Log out</button>
        </div>
    )
}

export default SideBar;