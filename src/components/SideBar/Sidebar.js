import * as React from 'react';
import './SideBar.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Sidebar(props) {

    let profilePic;
    const { currentUser } = React.useContext(CurrentUserContext)

    if (currentUser.data.avatar.length === 0) {
        profilePic =
            <div className='sidebar__default-img'>
                <p className='sidebar__default-initial'>{currentUser.data.name[0]}</p>
            </div>
    } else {
        profilePic = <img className="sidebar__profile-icon" src={currentUser === null ? 'Loading' : currentUser.data.avatar} alt='User Profile Pic' />
    }


    return (
        <div className='sidebar'>
            <div className='sidebar__profile-info'>
                {profilePic}
                <p className="sidebar__username">{currentUser.data.name}</p>
            </div>
            <button className='sidebar__button' onClick={props.handleEditProfile}>Change Profile Data</button>
            <button className='sidebar__button' onClick={props.handleLogOut}>Log out</button>
        </div>
    )
}

export default Sidebar;