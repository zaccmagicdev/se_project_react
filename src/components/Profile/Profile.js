import * as React from 'react';
import ClothesSection from '../ClothesSection/ClothesSection';
import Sidebar from '../SideBar/Sidebar';
import './Profile.css';

function Profile(props){
   return(
    <div className='profile'>
      <Sidebar handleLogOut={props.handleLogOut}/>
      {/*<ClothesSection handleOpenModal={props.handleOpenModal} cards={props.cards} handleOpenFormModal={props.handleOpenFormModal}/*/}
    </div>
   );
}

export default Profile;