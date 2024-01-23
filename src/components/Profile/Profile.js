import * as React from 'react';
import ClothesSection from '../ClothesSection/ClothesSection';
import SideBar from '../SideBar/SideBar';
import './Profile.css';

function Profile(props) {

  return (
    <div className='profile'>
      <Sidebar handleLogOut={props.handleLogOut} handleEditProfile={props.handleEditProfile} />
      <ClothesSection handleOpenModal={props.handleOpenModal} cards={props.cards} handleOpenFormModal={props.handleOpenFormModal} onCardLike={props.onCardLike} />
    </div>
  );
}

export default Profile;
