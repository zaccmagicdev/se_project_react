import * as React from 'react';
import ClothesSection from '../ClothesSection/ClothesSection';
import Sidebar from '../SideBar/Sidebar';
//import './Profile.css';

function Profile(props){
   return(
    <div className='profile'>
      <Sidebar />
      <ClothesSection handleOpenModal={props.handleOpenModal} cards={props.cards}/>
    </div>
   );
}

export default Profile;